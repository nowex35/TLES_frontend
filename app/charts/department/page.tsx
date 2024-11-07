"use client"

import React from "react";
import DepartmentPieComponent from "@/components/charts/AllDepartmentPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>所属割合グラフ</h1>
            <DepartmentPieComponent />
        </div>
    )
}

export default Page