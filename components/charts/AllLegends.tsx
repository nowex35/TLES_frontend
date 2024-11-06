import React from "react";
import { PieChart, Legend, ResponsiveContainer } from "recharts";
import { GENDER_COLORS, GRADE_COLORS, CATEGORY_COLORS, PLAY_FREQ_COLORS, VIEWING_FREQ_COLORS } from "./utils/colors";

interface AllLegendsProps {
    type: "gender" | "grade" | "category" | "playFreq" | "viewingFreq";
}

const AllLegends: React.FC<AllLegendsProps> = ({ type }) => {
    let legendData;

    switch (type) {
        case "gender":
            legendData = Object.keys(GENDER_COLORS).map(name => ({
                value: name,
                type: "square",
                color: GENDER_COLORS[name]
            }));
            break;
        case "grade":
            legendData = Object.keys(GRADE_COLORS).map(name => ({
                value: name,
                type: "square",
                color: GRADE_COLORS[name]
            }));
            break;
        case "category":
            legendData = Object.keys(CATEGORY_COLORS).map(name => ({
                value: name,
                type: "square",
                color: CATEGORY_COLORS[name]
            }));
            break;
        case "playFreq":
            legendData = Object.keys(PLAY_FREQ_COLORS).map(name => ({
                value: name,
                type: "square",
                color: PLAY_FREQ_COLORS[name]
            }));
            break;
        case "viewingFreq":
            legendData = Object.keys(VIEWING_FREQ_COLORS).map(name => ({
                value: name,
                type: "square",
                color: VIEWING_FREQ_COLORS[name]
            }));
            break;
        default:
            legendData = [];
    }

    return (
        <div style={{ width: "100%", height: 60 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Legend
                        payload={legendData}
                        layout="horizontal"
                        align="center"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AllLegends;