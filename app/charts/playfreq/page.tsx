import { getAuthSession } from "@/components/lib/nextauth";
import PlayFreqPieComponent from "@/components/charts/AllPlayFreqPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";

const PlayFreqPiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventPlayFreqData = aggregateData(ticketData, 'PlayFreqCounts', 'play_freq')

    return (
        <div>
            <h1>スポーツ実施割合グラフ</h1>
            <PlayFreqPieComponent user={user} eventPlayFreqData={eventPlayFreqData} />
        </div>
    )
}

export default PlayFreqPiePage