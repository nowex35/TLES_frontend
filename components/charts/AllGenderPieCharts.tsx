import React from "react"
import GenderDisplay from "./GenderPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [gender: string]: number
}

interface EventData {
    eventId: number
    genderCounts: CountAry
}

const GenderPieComponent: React.FC = () => {
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

    const eventGenderData = aggregateData(ticketData, 'genderCounts','gender')

    return (
        <>
            <AllLegends type="gender" />
            <div className="flex flex1">
            {eventGenderData.map((eventData, index) => (
                <GenderDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default GenderPieComponent;