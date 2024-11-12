"use client"

import React from "react"
import AttendanceCountDisplay from "./AttendanceCountPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth"
import { Skeleton } from "@/components/ui/skeleton"

interface AttendanceCountPieComponentProps {
    user: UserType | null
}
interface CountAry {
    [attendance_count: string]: number
}

interface EventData {
    eventId: number
    attendanceCountCounts: CountAry
}

const AttendanceCountPieComponent: React.FC<AttendanceCountPieComponentProps> = ({ user }) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventAttendanceCountData = aggregateData(ticketData, 'attendanceCountCounts', 'attendance_count')

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