// utils/dataAggregator.ts
export const aggregateData = (ticketData: any[], key: string, countKey: string) => {
    return Object.values(ticketData.reduce((acc, ticket) => {
        const eventId = ticket.event_id;
        const countValue = ticket[countKey];

        if (!acc[eventId]) {
            acc[eventId] = { eventId: Number(eventId), [key]: {} };
        }

        acc[eventId][key][countValue] = (acc[eventId][key][countValue] || 0) + 1;
        return acc;
    }, {}));
};

export const aggregateSalesQuantity = (ticketData: any[], referralFilter: string) => {
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
    }, {}));
};

export const aggregateReferralSource = (ticketData: any[]) => {
    return Object.values(ticketData.reduce((acc: any, ticket: any) => {
        const { event_id, referral_source } = ticket;

        if (!acc[event_id]) {
            acc[event_id] = { eventId: Number(event_id), refCounts: {} };
        }

        referral_source.split(',').map(source => source.trim()).forEach(source => {
            if (!acc[event_id].refCounts[source]) {
                acc[event_id].refCounts[source] = 0;
            }
            acc[event_id].refCounts[source] += 1;
        });

        return acc;
    }, {}));
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
        event.timeSalesCounts = Object.entries(event.timeSalesCounts)
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