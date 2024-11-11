"use client"

import React from "react";
import SalesByTimeSlotComponent from "@/components/charts/AllSalesByTimeSlotCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>時間帯別売上割合グラフ</h1>
            <SalesByTimeSlotComponent />
        </div>
    )
}

export default Page