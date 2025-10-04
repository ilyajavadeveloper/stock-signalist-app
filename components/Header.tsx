import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import {searchStocks} from "@/lib/actions/finnhub.actions";
import UserDropdown from "@/components/UserDropDown";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Signalist logo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

<<<<<<< HEAD
                <UserDropDown user={{
                    id: '228444123',
                    name: 'iluha loh',
                    email: 'iluhaloh@gmail.com'
                }} initialStocks={[]}/>

=======
                <UserDropdown user={user} initialStocks={initialStocks} />
>>>>>>> ad6d186aac5d6ba72036a83c9e425879bbe800a7
            </div>
        </header>
    )
}
export default Header
