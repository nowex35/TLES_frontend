import React, { useEffect, useState } from "react"
import { getTicketData } from "@/actions/user"
import PlaySportsDisplay from "./PlayFreqPieChart"
import { toast } from "react-hot-toast"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"

interface CountAry {
    [play_freq: string]: number
}

interface EventData {
    eventId: number
    PlayFreqCounts: CountAry
}

const PlaySportsPieComponent: React.FC = () => {
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
        const { event_id, play_freq } = ticket;
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), PlayFreqCounts: {} };
        }
        acc[event_id].PlayFreqCounts[play_freq] = (acc[event_id].PlayFreqCounts[play_freq] || 0) + 1;
        return acc;
    }, {} as Record<number, EventData>))

    return (
        <>
            <AllLegends type="playFreq" />
            <div className="flex flex1">
            {eventCategoryData.map((eventData, index) => (
                <PlaySportsDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
    )
}

export default PlaySportsPieComponent;