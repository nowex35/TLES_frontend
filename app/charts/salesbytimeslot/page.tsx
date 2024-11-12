import { getAuthSession } from "@/components/lib/nextauth";
import SalesByTimeSlotComponent from "@/components/charts/AllSalesByTimeSlotCharts";

const SalesByTimeSlotPage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>時間帯別売上割合グラフ</h1>
            <SalesByTimeSlotComponent user={user} />
        </div>
    )
}

export default SalesByTimeSlotPage;