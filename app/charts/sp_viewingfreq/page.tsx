import { getAuthSession } from "@/components/lib/nextauth";
import SpViewingFreqPieComponent from "@/components/charts/AllSpViewingPieCharts";

const SpViewingPiePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>開催競技観戦頻度グラフ</h1>
            <SpViewingFreqPieComponent user={user} />
        </div>
    )
}

export default SpViewingPiePage