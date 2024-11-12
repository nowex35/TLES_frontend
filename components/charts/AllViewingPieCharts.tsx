"use client"

import React from "react"
import ViewingFreqDisplay from "./ViewingPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewingFreqComponentProps {
    user: UserType | null
}

interface CountAry {
    [viewing_freq: string]: number
}

interface EventData {
    eventId: number
    ViewingFreqCounts: CountAry
}

const ViewingFreqPieComponent: React.FC<ViewingFreqComponentProps> = ({ user }) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventViewingFreqData = aggregateData(ticketData, 'ViewingFreqCounts', 'viewing_freq')

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="viewingFreq" />
                    <div className="flex flex1">
                    {eventViewingFreqData.map((eventData, index) => (
                        <ViewingFreqDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default ViewingFreqPieComponent;