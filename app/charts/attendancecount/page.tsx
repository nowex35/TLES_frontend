import { getAuthSession } from "@/components/lib/nextauth";
import AttendanceCountPieComponent from "@/components/charts/AllAttendanceCountPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const AttendanceCountPage = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateData(ticketData,'attendanceCountCounts','attendance_count');

    return (
        <div>
            <h1>来場回数割合グラフ</h1>
            <AttendanceCountPieComponent user={user} eventData={eventData} />
        </div>
    )
}

export default AttendanceCountPage