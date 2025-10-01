"use client";
import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/UseTraidingViewWidget";


interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config?: Record<string, unknown>; // сделал необязательным
    height?: number;
    className?: string;
}

const TradingViewWidget = ({
                               title,
                               scriptUrl,
                               config = {}, // дефолт
                               height = 600,
                               className = "",
                           }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div
            className={`tradingview-widget-container ${className}`}
            ref={containerRef}
            style={{ height }}
        >
            {title && <h2 className="mb-2 text-lg font-semibold">{title}</h2>}
            <div className="tradingview-widget-container__widget" />
        </div>
    );
};

export default memo(TradingViewWidget);
