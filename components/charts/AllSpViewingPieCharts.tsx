import React, { useEffect, useState } from "react"
import { getTicketData } from "@/actions/user"
import SpViewingFreqDisplay from "./SpViewingPieChart"
import { toast } from "react-hot-toast"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"

interface CountAry {
    [special_viewing_freq: string]: number
}

interface EventData {
    eventId: number
    SpViewingFreqCounts: CountAry
}

const SpViewingFreqPieComponent: React.FC = () => {
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

    const eventCategoryData = Object.values(ticketData.reduce((acc, ticket) => {
        const { event_id, viewing_freq } = ticket
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), SpViewingFreqCounts: {} }
        }
        acc[event_id].SpViewingFreqCounts[viewing_freq] = (acc[event_id].SpViewingFreqCounts[viewing_freq] || 0) + 1
        return acc
    }, {} as Record<number, EventData>))

    return (
        <>
            <AllLegends type="viewingFreq" />
            <div className="flex flex1">
            {eventCategoryData.map((eventData, index) => (
                <SpViewingFreqDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default SpViewingFreqPieComponent;