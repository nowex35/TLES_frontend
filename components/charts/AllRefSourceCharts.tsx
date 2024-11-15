"use client"

import React from "react";
import RefSourceDisplay from "./RefSourceChart";
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const RefSourceComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            {user ? (
                <div className="flex flex-wrap">
                    {eventData.map((eventData) => (
                        <RefSourceDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                </div>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    );
};

export default RefSourceComponent;