import React from "react"
import { ATTENDANCE_COUNT_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"
import { EVENT_INFO } from "./utils/events"
import { eventProps } from "@/types"

const AttendanceCountDisplay: React.FC<eventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.countsAry).sort(([, valueA], [, valueB]) => valueB - valueA).map(([name, value]) => ({ name, value }))
    const eventName = EVENT_INFO[eventData.eventId];


    return (
            <div style={{ width: "100%", height: 60 }}>
                <h3>{eventName ? eventName : `イベントID: ${eventData.eventId}`}</h3>
                <CustomPieChart data={data} colors={ATTENDANCE_COUNT_COLORS} />
            </div>
    )
}

export default AttendanceCountDisplay;
