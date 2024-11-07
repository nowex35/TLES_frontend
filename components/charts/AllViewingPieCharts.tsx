import React from "react"
import ViewingFreqDisplay from "./ViewingPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [viewing_freq: string]: number
}

interface EventData {
    eventId: number
    ViewingFreqCounts: CountAry
}

const ViewingFreqPieComponent: React.FC = () => {
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

    const eventViewingFreqData = aggregateData(ticketData, 'ViewingFreqCounts', 'viewing_freq')

    return (
        <>
            <AllLegends type="viewingFreq" />
            <div className="flex flex1">
            {eventViewingFreqData.map((eventData, index) => (
                <ViewingFreqDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default ViewingFreqPieComponent;