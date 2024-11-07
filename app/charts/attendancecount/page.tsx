"use client"

import React from "react";
import AttendanceCountPieComponent from "@/components/charts/AllAttendanceCountPieCharts";

const Page: React.FC = () => {
    return (
        <div>
            <h1>来場回数割合グラフ</h1>
            <AttendanceCountPieComponent />
        </div>
    )
}

export default Page