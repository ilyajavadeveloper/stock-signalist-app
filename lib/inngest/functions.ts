import { inngest } from "@/lib/inngest/client";
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
import { getAllUsersForNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";

// Хелпер для извлечения текста из ответа AI
const extractText = (response: any, fallback: string) =>
    response?.candidates?.[0]?.content?.parts?.[0]?.text || fallback;

export const sendSignUpEmail = inngest.createFunction(
    { id: "sign-up-email" },
    { event: "app/user.created" },
    async ({ event, step }) => {
        const userProfile = `
      - Country: ${event.data.country}
      - Investment goals: ${event.data.investmentGoals}
      - Risk tolerance: ${event.data.riskTolerance}
      - Preferred industry: ${event.data.preferredIndustry}
    `;

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile);

        const response = await step.ai.infer("generate-welcome-intro", {
            model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
            body: {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            },
        });

        await step.run("send-welcome-email", async () => {
            const introText = extractText(
                response,
                "Thanks for joining Signalist. You now have the tools to track markets and make smarter moves."
            );

            const {
                data: { email, name },
            } = event;

            return await sendWelcomeEmail({ email, name, intro: introText });
        });

        return { success: true, message: "Welcome email sent successfully" };
    }
);

export const sendDailyNewsSummary = inngest.createFunction(
    { id: "daily-news-summary" },
    [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }],
    async ({ step }) => {
        // Step #1: получить пользователей
        const users = await step.run("get-all-users", getAllUsersForNewsEmail);
        if (!users || users.length === 0)
            return { success: false, message: "No users found for news email" };

        // Step #2: собрать новости
        const results = await step.run("fetch-user-news", async () => {
            const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];

            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                    }
                    perUser.push({ user, articles: (articles ?? []).slice(0, 6) });
                } catch (e) {
                    console.error("daily-news: error preparing user news", user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }

            return perUser;
        });

        // Step #3: AI summary
        const userNewsSummaries = await Promise.all(
            results.map(async ({ user, articles }) => {
                try {
                    const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
                        "{{newsData}}",
                        JSON.stringify(articles, null, 2)
                    );

                    const response = await step.ai.infer(`summarize-news-${user.email}`, {
                        model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
                        body: { contents: [{ role: "user", parts: [{ text: prompt }] }] },
                    });

                    return { user, newsContent: extractText(response, "No market news.") };
                } catch (e) {
                    console.error("Failed to summarize news for: ", user.email);
                    return { user, newsContent: null };
                }
            })
        );

        // Step #4: отправка писем
        await step.run("send-news-emails", async () => {
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent }) => {
                    if (!newsContent) return false;

                    return await sendNewsSummaryEmail({
                        email: user.email,
                        date: getFormattedTodayDate(),
                        newsContent,
                    });
                })
            );
        });

        return { success: true, message: "Daily news summary emails sent successfully" };
    }
);
