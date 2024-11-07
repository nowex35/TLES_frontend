import React from "react"
import DaySalesDisplay from "./DaySalesChart"
import useFetchData from "./utils/useFetchData"
import { aggregateData } from "./utils/dataAggregator"

interface DaySalesAry {
    [purchase_datetime: string]: number
}

interface EventData {
    eventId: number
    daysalesCounts: DaySalesAry
}

const DaySalesComponent: React.FC = () => {
    const { data: ticketData, loading, error } = useFetchData()

    if (loading) {
        return <p>ロード中...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!ticketData.length) {
        return <p>データがありません</p>
    }

    const eventDaySalesData = Object.values(ticketData.reduce((acc: any, ticket: any) => {
        const { event_id, purchase_datetime, quantity  } = ticket;

        const date = new Date(purchase_datetime).toISOString().split('T')[0];

        // event_idが存在しない場合は初期化
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), daysalesCounts: {} };
        }

        acc[event_id].daysalesCounts[date] = (acc[event_id].daysalesCounts[date] || 0) + quantity;
        return acc;
    },{}));

    eventDaySalesData.forEach( eventData  => {
        const daysalesCounts = eventData.daysalesCounts;
        const dates = Object.keys(daysalesCounts);

        if (dates.length > 0) {
            const startDate = new Date(Math.min(...dates.map(date => new Date(date).getTime())));
            const endDate = new Date(Math.max(...dates.map(date => new Date(date).getTime())));
            const allDates: Set<string> = new Set();

            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const formattedDate = new Date(d).toISOString().split('T')[0];
                allDates.add(formattedDate);
            }

            // すべての日付を0で初期化
            allDates.forEach(date => {
                if (!daysalesCounts[date]) {
                    daysalesCounts[date] = 0; // 購入履歴がない日を0として登録
                }
            });
        }

        // 日付でソート
        eventData.daysalesCounts = Object.fromEntries(
            Object.entries(daysalesCounts).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        )
    })

    return (
        <>
            <div className="flex flex1">
            {eventDaySalesData.map((eventData, index) => (
                <DaySalesDisplay key={eventData.eventId} eventData={eventData} />
            ))}
            </div>
        </>
        
    )
}

export default DaySalesComponent;