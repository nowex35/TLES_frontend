"use client";

import React from "react"
import AgeDisplay from "./AgePieChart"
import AllLegends from "./AllLegends"
import  { UserType } from "@/components/lib/nextauth"
import { Skeleton } from "@/components/ui/skeleton"

interface AgePieComponentProps {
    user: UserType | null;
    eventAgeData: EventData[];
}

interface CountAry {
    [age_group: string]: number
}

interface EventData {
    eventId: number
    ageCounts: CountAry
}

const AgePieComponent: React.FC<AgePieComponentProps> = ({
    user,
    eventAgeData,
}) => {
    return (
        <>
            {user ? (
                <>
                    <AllLegends type="age" />
                    <div className="flex flex1">
                    {eventAgeData.map((eventData, index) => (
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