"use client"

import React from "react"
import GradeDisplay from "./GradePieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryPieComponentProps {
    user: UserType | null
    eventGradeData: EventData[]
}

interface CountAry {
    [grade: string]: number
}

interface EventData {
    eventId: number
    gradeCounts: CountAry
}

const CategoryPieComponent: React.FC<CategoryPieComponentProps> = ({
    user,
    eventGradeData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="grade" />
                    <div className="flex flex1">
                    {eventGradeData.map((eventData, index) => (
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