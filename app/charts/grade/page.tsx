"use client"

import React from "react";
import GradePieComponent from "@/components/charts/AllGradePieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>学年割合グラフ</h1>
            <GradePieComponent />
        </div>
    )
}

export default Page