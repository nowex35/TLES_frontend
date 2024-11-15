"use client"

import React from "react"
import ViewingFreqDisplay from "./ViewingPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const ViewingFreqPieComponent: React.FC<chartComponentProps> = ({
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