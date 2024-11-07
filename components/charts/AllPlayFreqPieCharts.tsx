import React from "react"
import PlaySportsDisplay from "./PlayFreqPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [play_freq: string]: number
}

interface EventData {
    eventId: number
    PlayFreqCounts: CountAry
}

const PlaySportsPieComponent: React.FC = () => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventPlayFreqData = aggregateData(ticketData, 'PlayFreqCounts', 'play_freq')

    return (
        <>
            <AllLegends type="playFreq" />
            <div className="flex flex1">
            {eventPlayFreqData.map((eventData, index) => (
                <PlaySportsDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default PlaySportsPieComponent;