import { useExpense } from './../context/UseExpense';
import {
  formateCurrency,
  getExpensesByCategory,
  getTotalExpense,
} from '../utils/expenses';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
export const ExpenseSummary = () => {
  const { expenses } = useExpense();
  const totalExpenses = getTotalExpense(expenses);

  let highestCategory = {
    name: 'none',
    amount: 0,
  };
  const categoriesData = getExpensesByCategory(expenses);
  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = {
        name: category,
        amount: amount,
      };
    }
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow-md p-6 hover:shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-expense-light p-3 rounded-full">
            <Wallet size={24} className="text-expense" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">
              Total Expenses
            </h3>
            <p className="text-2xl text-expense-dark font-bold">
              {formateCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md p-6 hover:shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingUp size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">
              Highest Category
            </h3>
            <p className="text-2xl text-expense-dark font-bold">
              {highestCategory.name !== 'none' ? (
                <>
                  <span className="capitalize">{highestCategory.name}</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({formateCurrency(highestCategory.amount)})
                  </span>
                </>
              ) : (
                'None'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md p-6 hover:shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingDown size={24} className="text-green-500" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Entries</h3>
            <p className="text-2xl text-expense-dark font-bold">
              {expenses.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
