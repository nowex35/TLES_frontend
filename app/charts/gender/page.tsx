import { getAuthSession } from "@/components/lib/nextauth";
import GenderPieComponent from "@/components/charts/AllGenderPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";

const GenderPiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventGenderData = aggregateData(ticketData, 'genderCounts','gender')

    return (
        <div>
            <h1>性別割合グラフ</h1>
            <GenderPieComponent user={ user } eventGenderData={eventGenderData} />
        </div>
    )
}

export default GenderPiePage