import { getAuthSession } from "@/components/lib/nextauth";
import DepartmentPieComponent from "@/components/charts/AllDepartmentPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const DepartmentPage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const filteredTicketData = ticketData.filter(ticket => ticket.department !== "筑波大生でない");
    const eventData:eventData[] = aggregateData(filteredTicketData, 'departmentCounts', 'department')
    return (
        <div>
            <h1>所属割合グラフ</h1>
            <DepartmentPieComponent user={ user } eventData={eventData} />
        </div>
    )
}

export default DepartmentPage