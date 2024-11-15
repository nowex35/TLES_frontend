import { eventData,daySalesAggregatedData, daySalesAggregatedDataArray, countAry, TimeSlotCounts } from '../../../types';
export const aggregateData = (ticketData: any[], key: string, countKey: string): eventData[] => {
    const aggregatedData = Object.values(ticketData.reduce<Record<string, eventData>>((acc, ticket) => {
        const eventId = String(ticket.event_id);
        const countValue = String(ticket[countKey]);

        if (!acc[eventId]) {
            acc[eventId] = { eventId: Number(eventId), countsAry: {} };
        }

        acc[eventId].countsAry[countValue] = (acc[eventId].countsAry[countValue] || 0) + 1;

        return acc;
    }, {})); //変更点：Object.valuesで値の配列を取得

    return aggregatedData as eventData[];
};

export const aggregateSalesQuantity = (ticketData: any[], referralFilter: string) : daySalesAggregatedDataArray => {
    return Object.values(ticketData.reduce((acc: any, ticket: any) => {
        const { event_id, purchase_datetime, quantity, referral_source } = ticket;
        const date = new Date(purchase_datetime).toISOString().split('T')[0];

        // event_idが存在しない場合は初期化
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), daysalesCounts: {}, filteredCounts: {} };
        }

        // 日付ごとのカウント
        if (!acc[event_id].daysalesCounts[date]) {
            acc[event_id].daysalesCounts[date] = { data: 0, filteredData: 0 };
        }
        acc[event_id].daysalesCounts[date].data += quantity;

        if (
            referralFilter &&
            referral_source &&
            referral_source.includes(referralFilter)
          ) {
            acc[event_id].daysalesCounts[date].filteredData += quantity;
          }

        return acc;
    }, {} as Record<string, daySalesAggregatedData>));
};

export const aggregateReferralSource = (ticketData: any[]): eventData[] => {
    const aggregatedData: { [eventId: number]: { eventId: number; refCounts: countAry } } = ticketData.reduce((acc, ticket) => {
        const { event_id, referral_source } = ticket;
        const eventId = Number(event_id);

        if (!acc[eventId]) {
            acc[eventId] = { eventId: eventId, refCounts: {} };
        }

        referral_source.split(',').map((source:string) => source.trim()).forEach((source:string) => {
            if (!acc[eventId].refCounts[source]) {
                acc[eventId].refCounts[source] = 0;
            }
            acc[eventId].refCounts[source] += 1;
        });

        return acc;
    }, {} as { [eventId: number]: { eventId: number; refCounts: countAry } }); // 初期値の型指定


    return Object.values(aggregatedData).map(({ eventId, refCounts }) => ({
        eventId,
        countsAry: refCounts,
    }));
};

export const aggregateSalesQuantityByTimeSlot = (ticketData: any[], referralFilter: string) => {
    const result = ticketData.reduce((acc: any, ticket: any) => {
        const { event_id, purchase_datetime, quantity, referral_source } = ticket;
        const date = new Date(purchase_datetime);
        const hours = date.getHours();
        const minutes = Math.floor(date.getMinutes() / 15) * 15;
        const timeSlot = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        // イベントごとの初期化
        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), timeSalesCounts: {} };
        }

        // 時間帯ごとの初期化とデータの加算
        if (!acc[event_id].timeSalesCounts[timeSlot]) {
            acc[event_id].timeSalesCounts[timeSlot] = { data: 0, filteredData: 0 };
        }
        acc[event_id].timeSalesCounts[timeSlot].data += quantity;

        // リファラーフィルタに基づく加算
        if (referralFilter && referral_source && referral_source.includes(referralFilter)) {
            acc[event_id].timeSalesCounts[timeSlot].filteredData += quantity;
        }

        return acc;
    }, {});

    // 各イベントのtimeSalesCountsを24時間の15分間隔で埋める
    Object.values(result).forEach((event: any) => {
        const allTimeSlots = generateTimeSlots();
        allTimeSlots.forEach((slot) => {
            if (!event.timeSalesCounts[slot]) {
                event.timeSalesCounts[slot] = { data: 0, filteredData: 0 };
            }
        });
        // 時間順にソートし、フィルタ売上割合を計算
        event.timeSalesCounts = Object.entries<TimeSlotCounts>(event.timeSalesCounts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([timeSlot, counts]) => ({
                timeSlot,
                totalSales: counts.data,
                filteredSales: counts.filteredData,
                filteredSalesPercentage: counts.data > 0 ? (counts.filteredData / counts.data) * 100 : 0,
            }));
    });

    return Object.values(result);
};

// 24時間分の15分間隔の時間帯を生成するヘルパー関数
const generateTimeSlots = () => {
    const slots = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        }
    }
    return slots;
};

export const aggregateDataWithoutEventId = (ticketData: any, key: string, countKey: string) => {
    // ticketDataが配列でない場合、Object.valuesで配列に変換
    const ticketArray = Array.isArray(ticketData) ? ticketData : Object.values(ticketData);

    const aggregatedData = ticketArray.reduce((acc, ticket) => {
        const countValue = ticket[countKey];

        // countValue が undefined または null の場合は処理をスキップ
        if (countValue === undefined || countValue === null || countValue === '無回答') {
            return acc;
        }

        acc[key] = acc[key] || {};
        acc[key][countValue] = (acc[key][countValue] || 0) + 1;

        return acc;
    }, {} as { [key: string]: { [value: string]: number } });

    return aggregatedData;
};