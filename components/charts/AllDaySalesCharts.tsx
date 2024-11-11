import React, {useEffect} from "react";
import DaySalesDisplay from "./DaySalesChart";
import useFetchData from "./utils/useFetchData";
import { aggregateSalesQuantity } from "./utils/dataAggregator";
import { Combobox } from "@/components/combobox/Combobox";

const DaySalesComponent: React.FC = () => {
    const { data: ticketData, loading } = useFetchData();
    const [selectedOption, setSelectedOption] = React.useState("");
    const [eventDaySalesData, setEventDaySalesData] = React.useState([]);

    useEffect(() => {
        if (!loading) {
            const aggregatedData = aggregateSalesQuantity(ticketData, selectedOption);
            setEventDaySalesData(aggregatedData);
        }
    }, [ticketData, selectedOption, loading]);

    // 日付ごとに並び替え
    eventDaySalesData.forEach(eventData => {
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
                    daysalesCounts[date] = { data: 0, filteredData: 0 };
                }
            });
        }

        // 日付でソート
        eventData.daysalesCounts = Object.fromEntries(
            Object.entries(daysalesCounts).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        );
    });

    return (
        <>
            <Combobox onSelect={setSelectedOption} />
            <div className="flex flex1">
                {eventDaySalesData.map((eventData, index) => (
                    <DaySalesDisplay key={eventData.eventId} eventData={eventData} />
                ))}
            </div>
        </>
    );
};

export default DaySalesComponent;