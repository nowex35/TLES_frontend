"use client"

import React from "react"
import GradeDisplay from "./GradePieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const CategoryPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="grade" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
                        <GradeDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default CategoryPieComponent;