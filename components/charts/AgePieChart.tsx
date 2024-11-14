import React from "react"
import { AGE_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"
import { EVENT_INFO } from "./utils/events"

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
    const eventId = parseInt(eventData.eventId, 10); // eventId を数値に変換
    const eventName = EVENT_INFO[eventId]; // 数値型のキーでアクセス
    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
                <CustomPieChart data={data} colors={AGE_COLORS} />
            </div>
    )
}

export default AgeDisplay;
