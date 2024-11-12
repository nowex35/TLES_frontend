"use client"

import React from "react"
import PlaySportsDisplay from "./PlayFreqPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaySportsComponentProps {
    user: UserType | null
}

interface CountAry {
    [play_freq: string]: number
}

interface EventData {
    eventId: number
    PlayFreqCounts: CountAry
}

const PlaySportsPieComponent: React.FC<PlaySportsComponentProps> = ({ user }) => {
    const { data: ticketData, loading} = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventPlayFreqData = aggregateData(ticketData, 'PlayFreqCounts', 'play_freq')

    return (
        <>
            { user ? (
                <>
                    <AllLegends type="playFreq" />
                    <div className="flex flex1">
                    {eventPlayFreqData.map((eventData, index) => (
                        <PlaySportsDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default PlaySportsPieComponent;