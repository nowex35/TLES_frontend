"use client"
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import AllLegends from "./AllLegends";
import { AGE_COLORS, CATEGORY_COLORS, DEPARTMENT_COLORS, GENDER_COLORS, GRADE_COLORS } from "./utils/colors";

interface AggregatedData {
    name: string;
    value: number;
}

interface PieChartComponentProps {
    data: AggregatedData[];
    type: "age" | "category" | "department" | "gender" | "grade";
    colors: { [key: string]: string };
}

const AllChartComponent: React.FC<PieChartComponentProps> = ({ data, type, colors }) => {
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index
    }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <AllLegends type={type} />
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    animationDuration={1000}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[entry.name] || "#8884d8"} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default AllChartComponent;
