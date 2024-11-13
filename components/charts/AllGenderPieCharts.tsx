"use client";

import React from "react"
import GenderDisplay from "./GenderPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface GenderPieComponentProps {
    user: UserType | null
    eventGenderData: EventData[]
}

interface CountAry {
    [gender: string]: number
}

interface EventData {
    eventId: number
    genderCounts: CountAry
}

const GenderPieComponent: React.FC<GenderPieComponentProps> = ({
    user,
    eventGenderData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="gender" />
                    <div className="flex flex1">
                    {eventGenderData.map((eventData, index) => (
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