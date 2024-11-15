"use client";

import React from "react"
import GenderDisplay from "./GenderPieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const GenderPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="gender" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
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