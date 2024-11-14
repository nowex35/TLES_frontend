import React from "react"
import { GRADE_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"
import { EVENT_INFO } from "./utils/events"

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
    const data = Object.entries(eventData.gradeCounts).sort(([, valueA], [, valueB]) => valueB - valueA).map(([name, value]) => ({ name, value }))
    const eventId = parseInt(eventData.eventId, 10); // eventId を数値に変換
    const eventName = EVENT_INFO[eventId]; // 数値型のキーでアクセス

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
                <CustomPieChart data={data} colors={GRADE_COLORS} />
            </div>
    )
}

export default GradeDisplay;
