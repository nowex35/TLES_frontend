import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CATEGORY_COLORS } from "./utils/colors"
import CustomPieChart from "./CustomPieChart"

interface CategoryCount {
    [category: string]: number;
}

interface EventData {
    eventId: string;
    categoryCounts: CategoryCount;
}

interface EventProps {
    eventData: EventData;
}

const CategoryDisplay: React.FC<EventProps> = ( {eventData} ) => {
    const data = Object.entries(eventData.categoryCounts).map(([name, value]) => ({ name, value }))

    return (
            <div style={{ width: "100%", height: 60 }}> {/* 高さを調整 */}
                <h3>イベントID:{eventData.eventId}</h3>
                <CustomPieChart data={data} colors={CATEGORY_COLORS} />
            </div>
    )
}

export default CategoryDisplay;
