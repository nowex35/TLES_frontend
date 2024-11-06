"use client"

import React from "react";
import PlayFreqPieComponent from "@/components/charts/AllPlayFreqPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>スポーツ実施割合グラフ</h1>
            <PlayFreqPieComponent />
        </div>
    )
}

export default Page