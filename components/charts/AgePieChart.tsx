import React from "react"
import { AGE_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface AgeCount {
    [age_group: string]: number;
}

interface EventData {
    eventId: string;
    ageCounts: AgeCount;
}

interface EventProps {
    eventData: EventData;
}

const AgeDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.ageCounts).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={AGE_COLORS} />
            </div>
    )
}

export default AgeDisplay;
