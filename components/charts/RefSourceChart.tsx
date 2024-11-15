import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EVENT_INFO } from "./utils/events"
import { eventProps } from "@/types"


const RefSourceDisplay: React.FC<eventProps> = ({ eventData }) => {
    const eventName = EVENT_INFO[eventData.eventId];

    // refCounts の合計を計算
    const total = Object.values(eventData.countsAry).reduce((sum, value) => sum + value, 0);

    // 各リファラルソースの割合を計算し、多い順にソート
    const data = Object.entries(eventData.countsAry)
        .map(([name, value]) => ({
            name,
            count: value,
            percentage: ((value / total) * 100).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count);

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 60, right: 30, left: 40, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickFormatter={(tick) => `${tick}%`}
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={150}
                        interval={0}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value, name, props) => {
                            const { payload } = props;
                            return [`${payload.count} (${payload.percentage}%)`, name];
                        }}
                    />
                    <Bar dataKey="percentage" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RefSourceDisplay;
