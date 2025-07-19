import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formateCurrency } from './../utils/expenses';

const ExpenseBarChart = ({ data }) => {
  const chartData = Array.isArray(data)
    ? data.map(({ name, value }) => ({ name, amount: value })).reverse()
    : Object.entries(data)
        .map(([name, value]) => ({ name, amount: value }))
        .reverse();
  console.log(chartData);
  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No expense Data to display
      </div>
    );
  }
  const customToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{label}</p>
          <p className="text-lg">
            {formateCurrency(payload[0].payload.amount)}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => `PKR${value}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={customToolTip} />
        <Bar
          dataKey="amount"
          fill="#9b87f5"
          radius={[4, 4, 0, 0]}
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
