import React, { useState } from 'react';
import { useExpense } from './../context/UseExpense';
import { getChartData, getExpensesByMonth } from './../utils/expenses';
import PieChartButton from './PieChartButton';
import BarChartButton from './BarChartButton';
import { ExpensePieChart } from './ExpensePieChart';
import ExpenseBarChart from './ExpenseBarChart';

const ExpenseChart = () => {
  const { expenses } = useExpense();
  const [chartType, setChartType] = useState('pie');

  const chartData = getChartData(expenses);

  const monthlyData = getExpensesByMonth(expenses);
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md text-center p-6">
        <h2 className="text-2xl font-semibold mb-4 text-expense-dark">
          Expense Analytics
        </h2>
        <div className="flex mb-6 space-x-4 justify-between">
          <PieChartButton chartType={chartType} setChartType={setChartType} />
          <BarChartButton chartType={chartType} setChartType={setChartType} />
        </div>
        <p className="text-gray-500">
          Add some expenses to your sending Analytics
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-7 ">
      <h2 className="text-2xl font-semibold mb-4 text-expense-dark">
        Expense Analytics
      </h2>
      <div className="flex mb-6 space-x-4 justify-between">
        <PieChartButton chartType={chartType} setChartType={setChartType} />
        <BarChartButton chartType={chartType} setChartType={setChartType} />
      </div>
      <div>
        {chartType === 'pie' ? (
          <ExpensePieChart data={chartData} />
        ) : (
          <ExpenseBarChart data={monthlyData} />
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
