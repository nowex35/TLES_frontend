"use client"

import React from "react"
import DepartmentDisplay from "./DepartmentPieChart"
import AllLegends from "./AllLegends"
import { Skeleton } from "@/components/ui/skeleton";
import { chartComponentProps } from "@/types"

const DepartmentPieComponent: React.FC<chartComponentProps> = ({
    user,
    eventData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="department" />
                    <div className="flex flex1">
                    {eventData.map((eventData, index) => (
                        <DepartmentDisplay key={eventData.eventId} eventData={eventData} />
                    ))}
                    </div>
                </>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    )
}

export default DepartmentPieComponent;