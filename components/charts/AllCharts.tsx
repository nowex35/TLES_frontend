"use server"
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PieChartComponent from "./PieAllChart";
import { UserType } from "@/components/lib/nextauth";
import { AGE_COLORS, CATEGORY_COLORS, DEPARTMENT_COLORS, GENDER_COLORS, GRADE_COLORS } from "./utils/colors";

interface AllChartComponentProps {
    user: UserType | null;
    eventAgeData: eventAgeData[];
    eventCategoryData: eventCategoryData[];
    eventDepartmentData: eventDepartmentData[];
    eventGenderData: eventGenderData[];
    eventGradeData: eventGradeData[];
}

interface countAgeAry {
    [age_group: string]: number;
}

interface eventAgeData {
    eventId: number;
    ageCounts: countAgeAry;
}

interface countCategoryAry {
    [category: string]: number;
}

interface eventCategoryData {
    eventId: number;
    categoryCounts: countCategoryAry;
}

interface countDepartmentAry {
    [department: string]: number;
}

interface eventDepartmentData {
    eventId: number;
    departmentCounts: countDepartmentAry;
}

interface countGenderAry {
    [gender: string]: number;
}

interface eventGenderData {
    eventId: number;
    genderCounts: countGenderAry;
}

interface countGradeAry {
    [grade: string]: number;
}

interface eventGradeData {
    eventId: number;
    gradeCounts: countGradeAry;
}

interface AggregatedData {
    name: string;
    value: number;
}

const AllChartComponent: React.FC<AllChartComponentProps> = ({
    user,
    eventAgeData,
    eventCategoryData,
    eventDepartmentData,
    eventGenderData,
    eventGradeData,
}) => {
    const aggregateData = (eventData: any[], key: string): AggregatedData[] => {
        return eventData.reduce((accumulator: AggregatedData[], currentEventData) => {
            for (const group in currentEventData[key]) {
                if (group === "無回答") continue;
                const existingGroup = accumulator.find(item => item.name === group);
                if (existingGroup) {
                    existingGroup.value += currentEventData[key][group];
                } else {
                    accumulator.push({ name: group, value: currentEventData[key][group] });
                }
            }
            return accumulator;
        }, []).sort((a, b) => b.value - a.value);
    };

    const ageData = aggregateData(eventAgeData, "ageCounts");
    const categoryData = aggregateData(eventCategoryData, "categoryCounts");
    const departmentData = aggregateData(eventDepartmentData, "departmentCounts");
    const genderData = aggregateData(eventGenderData, "genderCounts");
    const gradeData = aggregateData(eventGradeData, "gradeCounts");

    return (
        <>
            {user ? (
                <div className="flex flex-wrap">
                    <PieChartComponent data={ageData} type="age" colors={AGE_COLORS} />
                    <PieChartComponent data={categoryData} type="category" colors={CATEGORY_COLORS} />
                    <PieChartComponent data={departmentData} type="department" colors={DEPARTMENT_COLORS} />
                    <PieChartComponent data={genderData} type="gender" colors={GENDER_COLORS} />
                    <PieChartComponent data={gradeData} type="grade" colors={GRADE_COLORS} />
                </div>
            ) : (
                <Skeleton className="h-64 w-full" />
            )}
        </>
    );
};

export default AllChartComponent;
