import { BarChart } from 'lucide-react';

const BarChartButton = ({ chartType, setChartType }) => {
  return (
    <button
      onClick={() => setChartType('bar')}
      className={`flex items-center px-4 py-2 cursor-pointer rounded-md transition-all ${
        chartType === 'bar'
          ? 'bg-expense-light text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <BarChart size={18} className="mr-2" />
      <span>Bar Chart</span>
    </button>
  );
};

export default BarChartButton;
