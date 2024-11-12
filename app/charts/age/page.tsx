import {  getAuthSession,UserType } from "@/components/lib/nextauth";
import AgePieComponent from "@/components/charts/AllAgePieCharts";

const AgePage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>年代割合グラフ</h1>
            <AgePieComponent user={user} />
        </div>
    )
}

export default AgePage