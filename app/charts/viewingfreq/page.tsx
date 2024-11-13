import { getAuthSession } from "@/components/lib/nextauth";
import ViewingFreqPieComponent from "@/components/charts/AllViewingPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";

const Page = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventViewingFreqData = aggregateData(ticketData, 'ViewingFreqCounts', 'viewing_freq');
    return (
        <div>
            <h1>スポーツ観戦頻度グラフ</h1>
        <ViewingFreqPieComponent user={user} eventViewingFreqData={eventViewingFreqData} />
        </div>
    )
}

export default Page