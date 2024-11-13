import { getAuthSession } from "@/components/lib/nextauth";
import DaySalesComponent from "@/components/charts/AllDaySalesCharts";
import { fetchData } from "@/components/charts/utils/fetchData";

const DaySalesPage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    return (
        <div>
            <h1>日別売上グラフ</h1>
            <DaySalesComponent user={user} ticketData={ticketData} />
        </div>
    )
}

export default DaySalesPage