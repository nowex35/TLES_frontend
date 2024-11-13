"use client"

import React from "react"
import SpViewingFreqDisplay from "./SpViewingPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface SpViewingFreqComponentProps {
    user: UserType | null
    eventSpViewingData: EventData[]
}


interface CountAry {
    [special_viewing_freq: string]: number
}

interface EventData {
    eventId: number
    SpViewingFreqCounts: CountAry
}

const SpViewingFreqPieComponent: React.FC<SpViewingFreqComponentProps> = ({
    user,
    eventSpViewingData
}) => {

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