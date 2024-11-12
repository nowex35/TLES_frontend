"use client"

import React, { useEffect, useState } from "react";
import SalesByTimeSlotDisplay from "./SalesByTimeSlotChart";
import useFetchData from "./utils/useFetchData";
import { aggregateSalesQuantityByTimeSlot } from "./utils/dataAggregator";
import { Combobox } from "@/components/combobox/Combobox";
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesByTimeSlotComponentProps {
    user: UserType | null;
}

const SalesByTimeSlotComponent: React.FC<SalesByTimeSlotComponentProps> = ({ user }) => {
    const { data: ticketData, loading } = useFetchData();
    const [selectedOption, setSelectedOption] = useState("");
    const [eventTimeSalesData, setEventTimeSalesData] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && ticketData.length > 0) {
            // 15分ごとの売上データを取得
            const aggregatedData = aggregateSalesQuantityByTimeSlot(ticketData, selectedOption);
            setEventTimeSalesData(aggregatedData);
        }
    }, [ticketData, selectedOption, loading]);

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