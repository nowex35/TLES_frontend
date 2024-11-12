"use client";

import React from "react"
import AgeDisplay from "./AgePieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import  { UserType } from "@/components/lib/nextauth"
import { Skeleton } from "@/components/ui/skeleton"

interface AgePieComponentProps {
    user: UserType | null;
}

interface CountAry {
    [age_group: string]: number
}

interface EventData {
    eventId: number
    ageCounts: CountAry
}

const AgePieComponent: React.FC<AgePieComponentProps> = ({user}) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }
    const eventDepartmentData = aggregateData(ticketData, 'ageCounts', 'age_group')

    return (
        <>
            {user ? (
                <>
                    <AllLegends type="age" />
                    <div className="flex flex1">
                    {eventDepartmentData.map((eventData, index) => (
                        <AgeDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default AgePieComponent;