import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { GRADE_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface GradeCount {
    [grade: string]: number;
}

interface EventData {
    eventId: string;
    gradeCounts: GradeCount;
}

interface EventProps {
    eventData: EventData;
}

const GradeDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.gradeCounts).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={GRADE_COLORS} />
            </div>
    )
}

export default GradeDisplay;
