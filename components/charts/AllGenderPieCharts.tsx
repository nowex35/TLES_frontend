import React, { useEffect, useState } from "react"
import { getTicketData } from "@/actions/user"
import GenderDisplay from "./GenderPieChart"
import { toast } from "react-hot-toast"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"

interface CountAry {
    [gender: string]: number
}

interface EventData {
    eventId: number
    genderCounts: CountAry
}

const GenderPieComponent: React.FC = () => {
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

    const eventGenderData = Object.values(ticketData.reduce((acc, ticket) => {
        const { event_id, gender } = ticket
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), genderCounts: {} }
        }
        acc[event_id].genderCounts[gender] = (acc[event_id].genderCounts[gender] || 0) + 1
        return acc
    }, {} as Record<number, EventData>))

    return (
        <>
            <AllLegends type="gender" />
            <div className="flex flex1">
            {eventGenderData.map((eventData, index) => (
                <GenderDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default GenderPieComponent;