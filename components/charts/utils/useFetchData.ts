import { useState, useEffect } from "react";
import { getTicketData } from "@/actions/user";
import { toast } from "react-hot-toast";

const useFetchData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTicketData();
                if (!result.success) {
                    throw new Error("データ取得に失敗しました");
                }
                if (result.ticketData) {
                    setData(result.ticketData);
                } else {
                    throw new Error("チケットデータがnullです");
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "不明なエラーが発生しました";
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading};
};

export default useFetchData;