import React from "react"
import AttendanceCountDisplay from "./AttendanceCountPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface CountAry {
    [attendance_count: string]: number
}

interface EventData {
    eventId: number
    attendanceCountCounts: CountAry
}

const AttendanceCountPieComponent: React.FC = () => {
    const { data: ticketData, loading, error } = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!ticketData.length) {
        return <p>データがありません</p>
    }

    const eventAttendanceCountData = aggregateData(ticketData, 'attendanceCountCounts', 'attendance_count')

    return (
        <>
            <AllLegends type="attendance" />
            <div className="flex flex1">
            {eventAttendanceCountData.map((eventData, index) => (
                <AttendanceCountDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default AttendanceCountPieComponent;