"use client"

import React from "react"
import DepartmentDisplay from "./DepartmentPieChart"
import AllLegends from "./AllLegends"
import { UserType } from "@/components/lib/nextauth";
import { Skeleton } from "@/components/ui/skeleton";

interface DepartmentPieComponentProps {
    user: UserType | null
    eventDepartmentData: EventData[]
}

interface CountAry {
    [department: string]: number
}

interface EventData {
    eventId: number
    departmentCounts: CountAry
}

const DepartmentPieComponent: React.FC<DepartmentPieComponentProps> = ({
    user,
    eventDepartmentData,
}) => {
    return (
        <>
            { user ? (
                <>
                    <AllLegends type="department" />
                    <div className="flex flex1">
                    {eventDepartmentData.map((eventData, index) => (
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