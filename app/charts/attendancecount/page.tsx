import { getAuthSession } from "@/components/lib/nextauth";
import AttendanceCountPieComponent from "@/components/charts/AllAttendanceCountPieCharts";

const AttendanceCountPage = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>来場回数割合グラフ</h1>
            <AttendanceCountPieComponent user={user} />
        </div>
    )
}

export default AttendanceCountPage