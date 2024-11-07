import React from "react"
import SpViewingFreqDisplay from "./SpViewingPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [special_viewing_freq: string]: number
}

interface EventData {
    eventId: number
    SpViewingFreqCounts: CountAry
}

const SpViewingFreqPieComponent: React.FC = () => {
    const { data: ticketData, loading, error } = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!ticketData.length) {
        return <p>データがありません</p>
    }

    const eventSpViewingData = aggregateData(ticketData, 'SpViewingFreqCounts', 'special_viewing_freq')

    return (
        <>
            <AllLegends type="viewingFreq" />
            <div className="flex flex1">
            {eventSpViewingData.map((eventData, index) => (
                <SpViewingFreqDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default SpViewingFreqPieComponent;