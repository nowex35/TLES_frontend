"use server"
import { getAuthSession } from "@/components/lib/nextauth"
"共通のAPIリクエスト"
const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = process.env.API_URL

    if (!apiUrl) {
        return { success: false, error: "API_URLが設定されていません" }
    }

    try {
        const session = await getAuthSession()
        if (session?.accessToken) {
            options.headers = {
                ...options.headers,
                Authorization: `JWT ${session.accessToken}`, // JWTをヘッダーに追加
            };
        }
        
        const response = await fetch(`${apiUrl}${url}`, options)

        if (!response.ok) {
            const error = await response.text(); // 詳細なエラー情報を取得
            console.error(`API Error: ${response.status} ${response.statusText}: ${error}`);
            return { success: false, error: `APIでエラーが発生しました: ${response.status} ${response.statusText}` };
        }

        //Content-Typeがapplication/jsonの場合のみJSONを解析
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            return { success: true, data }
        }

        //データなしで成功を返す
        return { success: true }
    } catch (error) {
        console.error("ネットワークエラーが発生しました:", error);
    
        // error がインスタンスでメッセージを持つ場合のみ処理する
        if (error instanceof Error) {
            return { success: false, error: `ネットワークエラーが発生しました: ${error.message}` };
        }
    
        // error がそれ以外の型の場合
        return { success: false, error: "ネットワークエラーが発生しました: 不明なエラー" };
    }
}


interface ticketDataProps {
    ticket_id: string
    order_number: number
    quantity: number
    purchase_datetime: string
    ticket_type: string
    ticket_price: number
    seat_type: string
    coupon_applied: boolean
    category: string
    nationality: string
    gender: string
    age_group: string
    grade: string
    department: string
    referral_source: string
    attendance_count: string
    play_freq: string
    viewing_freq: string
    special_viewing_freq: string
    event_id: number
}

export const getTicketData = async () => {
    const options = {
        method: "GET",
        cache: "no-store" as RequestCache,
    }

    //チケットデータを取得
    const result = await fetchAPI("/api/tickets/retrieve/", options)
    if (!result.success) {
        console.error("チケットデータ取得失敗:",result.error)
        return { success: false, ticketData: null }
    }
    const ticketData: ticketDataProps[] = result.data

    return { success: true, ticketData: ticketData }
}