import React from "react"
import GradeDisplay from "./GradePieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [category: string]: number
}

interface EventData {
    eventId: number
    gradeCounts: CountAry
}

const CategoryPieComponent: React.FC = () => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const filteredTicketData = ticketData.filter(ticket => ticket.grade !== "筑波大生でない");

    const eventGradeData = aggregateData(filteredTicketData, 'gradeCounts', 'grade')

    return (
        <>
            <AllLegends type="grade" />
            <div className="flex flex1">
            {eventGradeData.map((eventData, index) => (
                <GradeDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default CategoryPieComponent;