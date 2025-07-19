import { PieChart } from 'lucide-react';

const PieChartButton = ({ chartType, setChartType }) => {
  return (
    <button
      onClick={() => setChartType('pie')}
      className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition-all ${
        chartType === 'pie'
          ? 'bg-expense-light text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <PieChart size={18} className="mr-2" />
      <span>Pie Chart</span>
    </button>
  );
};

export default PieChartButton;
