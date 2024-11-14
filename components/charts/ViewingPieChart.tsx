import React from "react"
import { VIEWING_FREQ_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"
import { EVENT_INFO } from "./utils/events"

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
    const data = Object.entries(eventData.ViewingFreqCounts).sort(([, valueA], [, valueB]) => valueB - valueA).map(([name, value]) => ({ name, value }));
    const eventId = parseInt(eventData.eventId, 10); // eventId を数値に変換
    const eventName = EVENT_INFO[eventId]; // 数値型のキーでアクセス

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
                <CustomPieChart data={data} colors={VIEWING_FREQ_COLORS} />
            </div>
    )
}

export default ViewingFreqDisplay;
