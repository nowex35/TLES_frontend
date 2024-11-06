import React, { useEffect, useState } from "react"
import { getTicketData } from "@/actions/user"
import GradeDisplay from "./GradePieChart"
import { toast } from "react-hot-toast"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"

interface CountAry {
    [category: string]: number
}

interface EventData {
    eventId: number
    gradeCounts: CountAry
}

const CategoryPieComponent: React.FC = () => {
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

    const eventGradeData = Object.values(ticketData.reduce((acc, ticket) => {
        const { event_id, grade } = ticket
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), gradeCounts: {} }
        }
        acc[event_id].gradeCounts[grade] = (acc[event_id].gradeCounts[grade] || 0) + 1
        return acc
    }, {} as Record<number, EventData>))

    return (
        <>
            <AllLegends type="grade" />
            <div className="flex flex1">
            {eventGradeData.map((eventData, index) => (
                <GradeDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default CategoryPieComponent;