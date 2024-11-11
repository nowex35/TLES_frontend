import React from "react";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, ResponsiveContainer, Label } from "recharts";
import dayjs from "dayjs";

interface DaySalesCount {
    [purchase_datetime: string]: {
        data: number;
        filteredData: number;
    };
}

interface EventData {
    eventId: string;
    daysalesCounts: DaySalesCount;
}

interface EventProps {
    eventData: EventData;
}

const DaySalesDisplay: React.FC<EventProps> = ({ eventData }) => {
    const data = Object.entries(eventData.daysalesCounts).map(([date, counts]) => ({
        name: dayjs(date).format("YYYY-MM-DD"),
        value: counts.data,
        fillteredValue: counts.filteredData,
        filteredValuePercentage: (counts.filteredData / counts.data) * 100 || 0,
    }));

    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={data} margin={{ bottom: 70 }}>
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
                    <Label value="{{eventData.eventId}}" offset={0} position="insideTop" fontSize={20} fontWeight="bold" />
                </ComposedChart>
            </ResponsiveContainer>
        </>
    );
};

export default DaySalesDisplay;