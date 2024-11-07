"use client"

import React from "react";
import AgePieComponent from "@/components/charts/AllAgePieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>年代割合グラフ</h1>
            <AgePieComponent />
        </div>
    )
}

export default Page