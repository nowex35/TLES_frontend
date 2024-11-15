import { getAuthSession } from "@/components/lib/nextauth";
import GenderPieComponent from "@/components/charts/AllGenderPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const GenderPiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateData(ticketData, 'genderCounts','gender')

    return (
        <div>
            <h1>性別割合グラフ</h1>
            <GenderPieComponent user={ user } eventData={eventData} />
        </div>
    )
}

export default GenderPiePage