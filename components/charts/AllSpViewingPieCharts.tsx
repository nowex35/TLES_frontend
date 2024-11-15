"use client"

import React from "react"
import SpViewingFreqDisplay from "./SpViewingPieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const SpViewingFreqPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData
}) => {

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="viewingFreq" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
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