import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { VIEWING_FREQ_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface ViewingFreqCount {
    [play_freq: string]: number;
}

interface EventData {
    eventId: string;
    ViewingFreqCounts: ViewingFreqCount;
}

interface EventProps {
    eventData: EventData;
}

const ViewingFreqDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.ViewingFreqCounts).map(([name, value]) => ({ name, value }));

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={VIEWING_FREQ_COLORS} />
            </div>
    )
}

export default ViewingFreqDisplay;
