import { getAuthSession } from "@/components/lib/nextauth";
import CategoryPieComponent from "@/components/charts/AllCategoryPieCharts";

const CategoryPiePage: React.FC = async () => {
    const user = await getAuthSession();
    return (
        <div>
            <h1>カテゴリー割合グラフ</h1>
            <CategoryPieComponent user={user} />
        </div>
    )
}

export default CategoryPiePage