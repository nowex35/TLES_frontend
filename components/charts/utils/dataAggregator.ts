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