import { getTicketData } from "@/actions/user";

export const fetchData = async () => {
    try {
        const result = await getTicketData();
        if (!result.success) {
            throw new Error("データ取得に失敗しました");
        }
        if (result.ticketData) {
            return result.ticketData;
        } else {
            throw new Error("チケットデータがnullです");
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "不明なエラーが発生しました";
        console.error(errorMessage);
        throw err;
    }
};
