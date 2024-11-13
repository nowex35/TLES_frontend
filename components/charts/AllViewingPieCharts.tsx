"use client"

import React from "react"
import ViewingFreqDisplay from "./ViewingPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewingFreqComponentProps {
    user: UserType | null
    eventViewingFreqData: EventData[]
}

interface CountAry {
    [viewing_freq: string]: number
}

interface EventData {
    eventId: number
    ViewingFreqCounts: CountAry
}

const ViewingFreqPieComponent: React.FC<ViewingFreqComponentProps> = ({
    user,
    eventViewingFreqData
}) => {
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