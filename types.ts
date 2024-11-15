import { UserType } from "@/components/lib/nextauth";
export interface chartComponentProps{
    user: UserType | null;
    eventData: eventData[];
}

export interface eventData {
    eventId: number;
    countsAry: countAry;
}

export interface countAry {
    [name: string]: number;
}

export interface eventProps{
    eventData: eventData;
}

export interface daySalesAggregatedData {
    eventId: number;
    daysalesCounts: { [date: string]: { data: number; filteredData: number } };
}

export type daySalesAggregatedDataArray = daySalesAggregatedData[];

export interface daySalesProps {
    eventData: daySalesAggregatedData;
}

export interface TimeSlotCounts {
    data: number;
    filteredData: number;
}
