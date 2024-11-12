import { getAuthSession } from "@/components/lib/nextauth";
import GradePieComponent from "@/components/charts/AllGradePieCharts";

const GradePiePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>学年割合グラフ</h1>
            <GradePieComponent user={user} />
        </div>
    )
}

export default GradePiePage