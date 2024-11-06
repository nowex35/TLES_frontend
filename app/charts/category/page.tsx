"use client"

import React from "react";
import CategoryPieComponent from "@/components/charts/AllCategoryPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>カテゴリー割合グラフ</h1>
            <CategoryPieComponent />
        </div>
    )
}

export default Page