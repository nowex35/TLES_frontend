"use client"

import React from "react"
import PlaySportsDisplay from "./PlayFreqPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaySportsComponentProps {
    user: UserType | null
    eventPlayFreqData: EventData[]
}

interface CountAry {
    [play_freq: string]: number
}

interface EventData {
    eventId: number
    PlayFreqCounts: CountAry
}

const PlaySportsPieComponent: React.FC<PlaySportsComponentProps> = ({
    user,
    eventPlayFreqData,
}) => {
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