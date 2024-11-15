import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { AGE_COLORS, CATEGORY_COLORS, DEPARTMENT_COLORS, GENDER_COLORS, GRADE_COLORS } from "./utils/colors";
import { UserType } from "@/components/lib/nextauth";
import { eventData } from "@/types";

const PieChartComponent = dynamic(() => import('./PieAllChart'), { ssr: false });

interface AllChartComponentProps {
    user: UserType | null;
    eventAgeData: eventData[];
    eventCategoryData: eventData[];
    eventDepartmentData: eventData[];
    eventGenderData: eventData[];
    eventGradeData: eventData[];
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
    const aggregateData = (eventData: eventData[], key: string): AggregatedData[] => {
        return eventData.reduce((accumulator: AggregatedData[], currentEventData) => {
            // countsAry キーの存在を確認
            const counts = currentEventData.countsAry; 
            if (!counts) return accumulator;
    
            for (const group in counts) {
                if (group === "無回答") continue;
                const existingGroup = accumulator.find(item => item.name === group);
                if (existingGroup) {
                    existingGroup.value += counts[group];
                } else {
                    accumulator.push({ name: group, value: counts[group] });
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
            {user && ageData.length && categoryData.length && departmentData.length && genderData.length && gradeData.length ? (
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
