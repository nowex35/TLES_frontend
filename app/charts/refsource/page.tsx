import { getAuthSession } from "@/components/lib/nextauth";
import RefSourceComponent from "@/components/charts/AllRefSourceCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateReferralSource } from "@/components/charts/utils/dataAggregator";

const RefSourcePage = async () => {
    const user = getAuthSession();
    const ticketData = await fetchData();
    const eventReferralData = aggregateReferralSource(ticketData);
    
    return (
        <div>
            <h1>流入経路割合グラフ</h1>
            <RefSourceComponent user={user} eventReferralData={eventReferralData}  />
        </div>
    )
}

export default RefSourcePage