import { getTicketData } from "@/actions/user";
import { toast } from "react-hot-toast";

const getData = async () => {
    try {
        // アカウントの仮登録
        const res = await getTicketData();

        if (!res.success) {
            toast.error("データ取得に失敗しました")
            return
        }
    } catch (error) {
        toast.error("データ取得に失敗しました")
    }

    return (
        <div>
            <h1>データ取得</h1>
        </div>
    )
}