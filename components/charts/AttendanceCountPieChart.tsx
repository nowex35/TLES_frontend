import React from "react"
import { ATTENDANCE_COUNT_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface AttendanceCountCount {
    [attendance_count: string]: number;
}

interface EventData {
    eventId: string;
    attendanceCountCounts: AttendanceCountCount;
}

interface EventProps {
    eventData: EventData;
}

const AttendanceCountDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.attendanceCountCounts).sort(([, valueA], [, valueB]) => valueB - valueA).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={ATTENDANCE_COUNT_COLORS} />
            </div>
    )
}

export default AttendanceCountDisplay;
