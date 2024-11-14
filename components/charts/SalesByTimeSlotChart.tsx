import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from 'recharts';
import { EVENT_INFO } from "./utils/events"


interface TimeSlotData {
  timeSlot: string; // e.g., "13:15"
  totalSales: number;
  filteredSales: number;
  filteredSalesPercentage: number;
}

interface SalesByTimeSlotChartProps {
  eventId: string;
  data: TimeSlotData[];
}

const SalesByTimeSlotChart: React.FC<SalesByTimeSlotChartProps> = ({ eventId, data }) => {
  const event_id = parseInt(eventId,10)
  const eventName = EVENT_INFO[event_id]; // 数値型のキーでアクセス

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>{eventName ? eventName : `イベントID: ${event_id}`}</h3>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timeSlot"
            label={{ value: '時間帯 (15分刻み)', position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            yAxisId="left"
            label={{ value: '売上数', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'フィルタ売上割合 (%)', angle: -90, position: 'insideRight' }}
            domain={[0, 100]}
          />
          <Tooltip formatter={(value: number) => value.toFixed(2)} />
          <Bar
            yAxisId="left"
            dataKey="totalSales"
            fill="#8884d8"
            name="総売上数"
          />
          <Bar
            yAxisId="left"
            dataKey="filteredSales"
            fill="#82ca9d"
            name="フィルタ売上数"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="filteredSalesPercentage"
            stroke="#ff7300"
            name="フィルタ売上割合"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByTimeSlotChart;
