"use client"

import React from "react";
import RefSourceComponent from "@/components/charts/AllRefSourceCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>流入経路割合グラフ</h1>
            <RefSourceComponent />
        </div>
    )
}

export default Page