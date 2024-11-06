"use client"

import React from "react";
import ViewingFreqPieComponent from "@/components/charts/AllViewingPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>スポーツ観戦頻度グラフ</h1>
            <ViewingFreqPieComponent />
        </div>
    )
}

export default Page