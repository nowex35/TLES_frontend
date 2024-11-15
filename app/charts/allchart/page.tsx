import {  getAuthSession } from "@/components/lib/nextauth";
import AllChartComponent from "@/components/charts/AllCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";

const AllChartPage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventAgeData:eventData[] = aggregateData(ticketData, 'ageCounts', 'age_group');
    const eventCategoryData:eventData[] = aggregateData(ticketData, 'categoryCounts', 'category')
    const filteredDepartmentTicketData = ticketData.filter(ticket => ticket.department !== "筑波大生でない");
    const eventDepartmentData:eventData[] = aggregateData(filteredDepartmentTicketData, 'departmentCounts', 'department')
    const eventGenderData:eventData[] = aggregateData(ticketData, 'genderCounts','gender')
    const filteredGradeTicketData = ticketData.filter(ticket => ticket.grade !== "筑波大生でない");
    const eventGradeData:eventData[] = aggregateData(filteredGradeTicketData, 'gradeCounts', 'grade')
    return (
        <div>
            <h1>累積のグラフ</h1>
            <AllChartComponent
            user={user}
            eventAgeData={eventAgeData}
            eventCategoryData={eventCategoryData}
            eventDepartmentData={eventDepartmentData}
            eventGenderData={eventGenderData}
            eventGradeData={eventGradeData} />
        </div>
    )
}

export default AllChartPage