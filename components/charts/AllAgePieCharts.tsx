import React from "react"
import AgeDisplay from "./AgePieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [age_group: string]: number
}

interface EventData {
    eventId: number
    ageCounts: CountAry
}

const AgePieComponent: React.FC = () => {
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
    const eventDepartmentData = aggregateData(ticketData, 'ageCounts', 'age_group')

    return (
        <>
            <AllLegends type="age" />
            <div className="flex flex1">
            {eventDepartmentData.map((eventData, index) => (
                <AgeDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
        
    )
}

export default AgePieComponent;