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