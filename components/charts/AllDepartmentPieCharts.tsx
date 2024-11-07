import React from "react"
import DepartmentDisplay from "./DepartmentPieChart"
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

const DepartmentPieComponent: React.FC = () => {
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

    const filteredTicketData = ticketData.filter(ticket => ticket.department !== "筑波大生でない");

    const eventDepartmentData = aggregateData(filteredTicketData, 'departmentCounts', 'department')

    return (
        <>
            <AllLegends type="age" />
            <div className="flex flex1">
            {eventDepartmentData.map((eventData, index) => (
                <DepartmentDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
        
    )
}

export default DepartmentPieComponent;