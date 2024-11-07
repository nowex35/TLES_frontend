import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import dayjs from "dayjs"

interface DaySalesCount {
    [purchase_datetime: string]: number;
}

interface EventData {
    eventId: string;
    daysalesCounts: DaySalesCount;
}

interface EventProps {
    eventData: EventData;
}

const DaySalesDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.daysalesCounts).map(([date, count]) => ({
        name: dayjs(date).format("YYYY-MM-DD"),
        value: count 
    }));

    return (
        <div>
            <h3>イベントID:{eventData.eventId}</h3>
            <BarChart
                data={data}
                width={400}
                height={300}
                margin={{ bottom: 70}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="name"
                    type="category"
                    fontSize={10}
                    padding={{ left: 15, right: 15 }}
                    dx={-23}
                    dy={40}
                    angle={-60}
                    tickFormatter={(value) =>
                        dayjs(value).format("YYYY-MM-DD")
                    }
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
                <Tooltip
                    contentStyle={{ fontSize: 10 }}
                    labelFormatter={(label, payload) =>
                      dayjs(label).format("YYYY-MM-DD")
                    }
                />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default DaySalesDisplay;