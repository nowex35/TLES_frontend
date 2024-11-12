import { getAuthSession } from "@/components/lib/nextauth";
import DaySalesComponent from "@/components/charts/AllDaySalesCharts";

const DaySalesPage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>日別売上グラフ</h1>
            <DaySalesComponent user={user} />
        </div>
    )
}

export default DaySalesPage