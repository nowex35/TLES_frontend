import { getAuthSession } from "@/components/lib/nextauth";
import GradePieComponent from "@/components/charts/AllGradePieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const GradePiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const filteredTicketData = ticketData.filter(ticket => ticket.grade !== "筑波大生でない");
    const eventData: eventData[] = aggregateData(filteredTicketData, 'gradeCounts', 'grade')
    return (
        <div>
            <h1>学年割合グラフ</h1>
            <GradePieComponent user={user} eventData={eventData} />
        </div>
    )
}

export default GradePiePage