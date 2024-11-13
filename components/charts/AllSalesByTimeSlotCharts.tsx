"use client"

import React, { useEffect, useState } from "react";
import SalesByTimeSlotDisplay from "./SalesByTimeSlotChart";
import { aggregateSalesQuantityByTimeSlot } from "./utils/dataAggregator";
import { Combobox } from "@/components/combobox/Combobox";
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesByTimeSlotComponentProps {
    user: UserType | null;
    ticketData: any;
}

const SalesByTimeSlotComponent: React.FC<SalesByTimeSlotComponentProps> = ({
    user,
    ticketData
}) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [eventTimeSalesData, setEventTimeSalesData] = useState<any[]>([]);

    useEffect(() => {
        if ( ticketData.length > 0) {
            // 15分ごとの売上データを取得
            const aggregatedData = aggregateSalesQuantityByTimeSlot(ticketData, selectedOption);
            setEventTimeSalesData(aggregatedData);
        }
    }, [ticketData, selectedOption]);

    return (
        <>
            { user ? (
                <>
                    <Combobox onSelect={setSelectedOption} />
                    <div className="flex flex-wrap">
                        {eventTimeSalesData.map((eventData) => (
                            <SalesByTimeSlotDisplay
                                key={eventData.eventId}
                                eventId={eventData.eventId}
                                data={eventData.timeSalesCounts}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    );
};

export default SalesByTimeSlotComponent;