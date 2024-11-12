import { getAuthSession } from "@/components/lib/nextauth";
import PlayFreqPieComponent from "@/components/charts/AllPlayFreqPieCharts";

const PlayFreqPiePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>スポーツ実施割合グラフ</h1>
            <PlayFreqPieComponent user={user} />
        </div>
    )
}

export default PlayFreqPiePage