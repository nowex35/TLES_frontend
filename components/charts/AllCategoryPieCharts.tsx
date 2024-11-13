"use client"

import React from "react"
import CategoryDisplay from "./CategoryPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryPieComponentProps {
    user: UserType | null
    eventCategoryData: EventData[]
}

interface CountAry {
    [category: string]: number
}

interface EventData {
    eventId: number
    categoryCounts: CountAry
}

const CategoryPieComponent: React.FC<CategoryPieComponentProps> = ({
    user,
    eventCategoryData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="category" />
                    <div className="flex flex1">
                        {eventCategoryData.map((eventData, index) => (
                            <CategoryDisplay key={eventData.eventId} eventData={eventData} />
                        ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default CategoryPieComponent;