import React from "react"
import { PLAY_FREQ_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface PlayFreqCount {
    [play_freq: string]: number;
}

interface EventData {
    eventId: string;
    PlayFreqCounts: PlayFreqCount;
}

interface EventProps {
    eventData: EventData;
}

const PlayFreqDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.PlayFreqCounts).sort(([, valueA], [, valueB]) => valueB - valueA).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={PLAY_FREQ_COLORS} />
            </div>
    )
}

export default PlayFreqDisplay;
