"use client"

import React from "react";
import GenderPieComponent from "@/components/charts/AllGenderPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>性別割合グラフ</h1>
            <GenderPieComponent />
        </div>
    )
}

export default Page