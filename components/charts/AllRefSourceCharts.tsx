import React from "react";
import RefSourceDisplay from "./RefSourceChart";
import useFetchData from "./utils/useFetchData";
import { aggregateReferralSource } from "./utils/dataAggregator";

interface RefCounts {
    [referralSource: string]: number;
}

interface EventData {
    eventId: number;
    refCounts: RefCounts;
}

const CategoryPieComponent: React.FC = () => {
    const { data: ticketData, loading } = useFetchData();

    if (loading) {
        return <p>ロード中...</p>;
    }

    const eventReferralData = aggregateReferralSource(ticketData);

    return (
        <div className="flex flex-wrap">
            {eventReferralData.map((eventData) => (
                <RefSourceDisplay key={eventData.eventId} eventData={eventData} />
            ))}
        </div>
    );
};

export default CategoryPieComponent;