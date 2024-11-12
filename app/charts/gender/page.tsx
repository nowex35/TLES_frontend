import { getAuthSession } from "@/components/lib/nextauth";
import GenderPieComponent from "@/components/charts/AllGenderPieCharts";

const GenderPiePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>性別割合グラフ</h1>
            <GenderPieComponent user={ user } />
        </div>
    )
}

export default GenderPiePage