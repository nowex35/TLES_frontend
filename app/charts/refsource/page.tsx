import { getAuthSession } from "@/components/lib/nextauth";
import RefSourceComponent from "@/components/charts/AllRefSourceCharts";

const RefSourcePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>流入経路割合グラフ</h1>
            <RefSourceComponent user={user} />
        </div>
    )
}

export default RefSourcePage