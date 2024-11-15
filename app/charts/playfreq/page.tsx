import { getAuthSession } from "@/components/lib/nextauth";
import PlayFreqPieComponent from "@/components/charts/AllPlayFreqPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const PlayFreqPiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateData(ticketData, 'PlayFreqCounts', 'play_freq')

    return (
        <div>
            <h1>スポーツ実施割合グラフ</h1>
            <PlayFreqPieComponent user={user} eventData={eventData} />
        </div>
    )
}

export default PlayFreqPiePage