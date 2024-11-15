"use client"

import React from "react"
import AttendanceCountDisplay from "./AttendanceCountPieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton"
import { chartComponentProps } from "@/types"

const AttendanceCountPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="attendance" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
                        <AttendanceCountDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default AttendanceCountPieComponent;