import { getAuthSession } from "@/components/lib/nextauth";
import SalesByTimeSlotComponent from "@/components/charts/AllSalesByTimeSlotCharts";
import { fetchData } from "@/components/charts/utils/fetchData";

const SalesByTimeSlotPage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    return (
        <div>
            <h1>時間帯別売上割合グラフ</h1>
            <SalesByTimeSlotComponent user={user} ticketData={ticketData} />
        </div>
    )
}

export default SalesByTimeSlotPage;