import { getAuthSession } from "@/components/lib/nextauth";
import DepartmentPieComponent from "@/components/charts/AllDepartmentPieCharts";

const DepartmentPage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>所属割合グラフ</h1>
            <DepartmentPieComponent user={ user } />
        </div>
    )
}

export default DepartmentPage