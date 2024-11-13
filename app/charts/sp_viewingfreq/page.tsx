import { getAuthSession } from "@/components/lib/nextauth";
import SpViewingFreqPieComponent from "@/components/charts/AllSpViewingPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";

const SpViewingPiePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventSpViewingData = aggregateData(ticketData, 'SpViewingFreqCounts', 'special_viewing_freq')
    return (
        <div>
            <h1>開催競技観戦頻度グラフ</h1>
            <SpViewingFreqPieComponent user={user} eventSpViewingData={eventSpViewingData} />
        </div>
    )
}

export default SpViewingPiePage