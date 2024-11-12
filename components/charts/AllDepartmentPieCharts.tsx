"use client"

import React from "react"
import DepartmentDisplay from "./DepartmentPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface DepartmentPieComponentProps {
    user: UserType | null
}

interface CountAry {
    [age_group: string]: number
}

interface EventData {
    eventId: number
    ageCounts: CountAry
}

const DepartmentPieComponent: React.FC<DepartmentPieComponentProps> = ({user}) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const filteredTicketData = ticketData.filter(ticket => ticket.department !== "筑波大生でない");

    const eventDepartmentData = aggregateData(filteredTicketData, 'departmentCounts', 'department')

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="age" />
                    <div className="flex flex1">
                    {eventDepartmentData.map((eventData, index) => (
                        <DepartmentDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default DepartmentPieComponent;