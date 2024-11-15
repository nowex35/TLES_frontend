"use client"

import React from "react"
import PlaySportsDisplay from "./PlayFreqPieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const PlaySportsPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="playFreq" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
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