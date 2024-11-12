"use client"

import React from "react"
import SpViewingFreqDisplay from "./SpViewingPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface SpViewingFreqComponentProps {
    user: UserType | null
}


interface CountAry {
    [special_viewing_freq: string]: number
}

interface EventData {
    eventId: number
    SpViewingFreqCounts: CountAry
}

const SpViewingFreqPieComponent: React.FC<SpViewingFreqComponentProps> = ({ user }) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventSpViewingData = aggregateData(ticketData, 'SpViewingFreqCounts', 'special_viewing_freq')

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="viewingFreq" />
                    <div className="flex flex1">
                    {eventSpViewingData.map((eventData, index) => (
                        <SpViewingFreqDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default SpViewingFreqPieComponent;