import React from "react"
import CategoryDisplay from "./CategoryPieChart"
import AllLegends from "./AllLegends"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

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

    const eventCategoryData = aggregateData(ticketData, 'categoryCounts', 'category')

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