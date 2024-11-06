import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { VIEWING_FREQ_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface SpViewingFreqCount {
    [special_play_freq: string]: number;
}

interface EventData {
    eventId: string;
    SpViewingFreqCounts: SpViewingFreqCount;
}

interface EventProps {
    eventData: EventData;
}

const SpViewingFreqDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.SpViewingFreqCounts).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={VIEWING_FREQ_COLORS} />
            </div>
    )
}

export default SpViewingFreqDisplay;