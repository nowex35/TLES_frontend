import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { GENDER_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface GenderCount {
    [gender: string]: number;
}

interface EventData {
    eventId: string;
    genderCounts: GenderCount;
}

interface EventProps {
    eventData: EventData;
}

const GenderDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.genderCounts).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={GENDER_COLORS} />
            </div>
    )
}

export default GenderDisplay;
