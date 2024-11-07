"use client"

import React from "react";
import DaySalesComponent from "@/components/charts/AllDaySalesCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>日別売上グラフ</h1>
            <DaySalesComponent />
        </div>
    )
}

export default Page