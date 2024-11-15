import { getAuthSession } from "@/components/lib/nextauth";
import CategoryPieComponent from "@/components/charts/AllCategoryPieCharts";
import { fetchData } from "@/components/charts/utils/fetchData";
import { aggregateData } from "@/components/charts/utils/dataAggregator";
import { eventData } from "@/types";


const CategoryPiePage: React.FC = async () => {
    const user = await getAuthSession();
    const ticketData = await fetchData();
    const eventData: eventData[] = aggregateData(ticketData, 'categoryCounts', 'category')
    return (
        <div>
            <h1>カテゴリー割合グラフ</h1>
            <CategoryPieComponent user={user} eventData={eventData} />
        </div>
    )
}

export default CategoryPiePage