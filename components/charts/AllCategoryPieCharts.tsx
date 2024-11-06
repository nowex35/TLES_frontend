import React, { useEffect, useState } from "react"
import { getTicketData } from "@/actions/user"
import CategoryDisplay from "./CategoryPieChart"
import { toast } from "react-hot-toast"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"

interface CountAry {
    [category: string]: number
}

interface EventData {
    eventId: number
    categoryCounts: CountAry
}

const CategoryPieComponent: React.FC = () => {
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
        const { event_id, category } = ticket;
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), categoryCounts: {} };
        }
        acc[event_id].categoryCounts[category] = (acc[event_id].categoryCounts[category] || 0) + 1;
        return acc;
    }, {} as Record<number, EventData>))

    return (
        <>
            <AllLegends type="category" />
            <div className="flex flex1">
            {eventCategoryData.map((eventData, index) => (
                <CategoryDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
        
    )
}

export default CategoryPieComponent;