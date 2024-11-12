import { getAuthSession } from "@/components/lib/nextauth";
import ViewingFreqPieComponent from "@/components/charts/AllViewingPieCharts";

const Page = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>スポーツ観戦頻度グラフ</h1>
            <ViewingFreqPieComponent user={user} />
        </div>
    )
}

export default Page