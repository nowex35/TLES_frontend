import { getAuthSession } from "@/components/lib/nextauth";
import ViewingFreqPieComponent from "@/components/charts/AllViewingPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const Page = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateData(ticketData, 'ViewingFreqCounts', 'viewing_freq');
    return (
        <div>
            <h1>スポーツ観戦頻度グラフ</h1>
        <ViewingFreqPieComponent user={user} eventData={eventData} />
        </div>
    )
}

export default Page