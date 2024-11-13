"use client"

import React from "react";
import RefSourceDisplay from "./RefSourceChart";
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface RefSourceComponentProps {
    user: UserType | null;
    eventReferralData: EventData[];
}
interface RefCounts {
    [referralSource: string]: number;
}

interface EventData {
    eventId: number;
    refCounts: RefCounts;
}


const RefSourceComponent: React.FC<RefSourceComponentProps> = ({
    user,
    eventReferralData,
}) => {
    return (
        <>
            {user ? (
                <div className="flex flex-wrap">
                    {eventReferralData.map((eventData) => (
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