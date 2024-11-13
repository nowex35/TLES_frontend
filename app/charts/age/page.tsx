import {  getAuthSession } from "@/components/lib/nextauth";
import AgePieComponent from "@/components/charts/AllAgePieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";

const AgePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventAgeData = aggregateData(ticketData, 'ageCounts', 'age_group');
    
    return (
        <div>
            <h1>年代割合グラフ</h1>
            <AgePieComponent user={user} eventAgeData={eventAgeData} />
        </div>
    )
}

export default AgePage