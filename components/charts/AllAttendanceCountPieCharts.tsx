"use client"

import React from "react"
import AttendanceCountDisplay from "./AttendanceCountPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth"
import { Skeleton } from "@/components/ui/skeleton"

interface AttendanceCountPieComponentProps {
    user: UserType | null
    eventAttendanceCountData: EventData[]
}
interface CountAry {
    [attendance_count: string]: number
}

interface EventData {
    eventId: number
    attendanceCountCounts: CountAry
}

const AttendanceCountPieComponent: React.FC<AttendanceCountPieComponentProps> = ({
    user,
    eventAttendanceCountData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="attendance" />
                    <div className="flex flex1">
                    {eventAttendanceCountData.map((eventData, index) => (
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