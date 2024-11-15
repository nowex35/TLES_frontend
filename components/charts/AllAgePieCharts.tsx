"use client";

import React from "react"
import AgeDisplay from "./AgePieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton"
import { chartComponentProps } from "@/types"

const AgePieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            {user ? (
                <>
                    <AllLegends type="age" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
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