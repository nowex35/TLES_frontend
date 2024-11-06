"use client"

import React from "react";
import SpViewingFreqPieComponent from "@/components/charts/AllSpViewingPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>開催競技観戦頻度グラフ</h1>
            <SpViewingFreqPieComponent />
        </div>
    )
}

export default Page