"use client";

import React from "react"
import GenderDisplay from "./GenderPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface GenderPieComponentProps {
    user: UserType | null
}

interface CountAry {
    [gender: string]: number
}

interface EventData {
    eventId: number
    genderCounts: CountAry
}

const GenderPieComponent: React.FC<GenderPieComponentProps> = ({ user }) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventGenderData = aggregateData(ticketData, 'genderCounts','gender')

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="gender" />
                    <div className="flex flex1">
                    {eventGenderData.map((eventData, index) => (
                        <GenderDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default GenderPieComponent;