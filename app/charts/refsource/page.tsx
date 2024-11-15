import { getAuthSession } from "@/components/lib/nextauth";
import RefSourceComponent from "@/components/charts/AllRefSourceCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateReferralSource } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const RefSourcePage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateReferralSource(ticketData);
    
    return (
        <div>
            <h1>流入経路割合グラフ</h1>
            <RefSourceComponent user={user} eventData={eventData}  />
        </div>
    )
}

export default RefSourcePage