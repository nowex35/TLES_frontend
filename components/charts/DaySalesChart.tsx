import React from "react";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, ResponsiveContainer, Label } from "recharts";
import dayjs from "dayjs";
import { EVENT_INFO } from "./utils/events"
import { daySalesProps } from "@/types";

const DaySalesDisplay: React.FC<daySalesProps> = ({ eventData }) => {
    const data = Object.entries(eventData.daysalesCounts).map(([date, counts]) => ({
        name: dayjs(date).format("YYYY-MM-DD"),
        value: counts.data,
        fillteredValue: counts.filteredData,
        filteredValuePercentage: (counts.filteredData / counts.data) * 100 || 0,
    }));
    const eventName = EVENT_INFO[eventData.eventId];


    return (
        <div className="w-full">
            <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={data} margin={{ bottom: 70 }}>
                    <Label
                            value={eventName ? eventName : `イベントID: ${eventData.eventId}`}
                            position="top"  // ラベルの位置を上に設定
                            fontSize={16} // フォントサイズを調整
                        />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        type="category"
                        fontSize={10}
                        padding={{ left: 15, right: 15 }}
                        dx={-23}
                        dy={40}
                        angle={-60}
                        tickFormatter={(value) => dayjs(value).format("YYYY-MM-DD")}
                        interval={0}
                    />
                    <YAxis
                        label={{
                            value: "count",
                            position: "insideTopRight",
                            fontSize: 13
                        }}
                        domain={[0, "auto"]}
                        padding={{ top: 40 }}
                        tick={{ fontSize: 10 }}
                        allowDecimals={false}
                    />
                    <YAxis
                        orientation="right"
                        label={{
                            value: "割合 (%)",
                            angle: -90,
                            position: "insideTopRight",
                            fontSize: 13
                        }}
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                        yAxisId="right"
                    />
                    <Tooltip
                        contentStyle={{ fontSize: 10 }}
                        labelFormatter={(label) => dayjs(label).format("YYYY-MM-DD")}
                    />
                    <Bar dataKey="value" fill="red" />
                    <Bar dataKey="fillteredValue" fill="blue" opacity={0.7} />
                    <Line type="monotone" dataKey="filteredValuePercentage" stroke="#ff7300" yAxisId="right" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};


export default DaySalesDisplay;