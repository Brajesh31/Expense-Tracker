import { useState } from 'react';
import { formCategoryOptions } from '../utils/categoryOptions';
import { useExpense } from '../context/UseExpense';
import toast from 'react-hot-toast';
import {
  formateCurrency,
  formateDate,
  getCategoryTextColor,
} from '../utils/expenses';
import { Trash } from 'lucide-react';
const ExpenseList = () => {
  const tableHeading = ['Date', 'Description', 'Category', 'Amount', 'Actions'];
  const thStyle =
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const { expenses, deleteExpense } = useExpense();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const filteredExpenses = expenses.filter(
    (expense) => categoryFilter === 'all' || expense.category === categoryFilter
  );
  const sortedExpense = [...filteredExpenses].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );
  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success('Expense Deleted successfully');
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-expense-dark">
          Expense History
        </h2>

        <select
          className="px-3 py-1 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {formCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {sortedExpense.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-800">
          <p className="mb-2">No Expense Found</p>
          {categoryFilter === 'all' && (
            <p>Try changing the category filter or add new expenses.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto hidden lg:block ">
            <table className="min-w-full divide-y   divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeading.map((headText, index) => (
                    <th scope="col" className={thStyle} key={index}>
                      {headText}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedExpense.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-gray-900">
                      {formateDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.description}
                    </td>
                    <td
                      className={`${getCategoryTextColor(
                        expense.category
                      )} font-medium px-6 py-4`}
                    >
                      {expense.category.charAt(0).toUpperCase() +
                        expense.category.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formateCurrency(expense.amount)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="cursor-pointer py-4 px-6 whitespace-nowrap text-right "
                      >
                        <Trash
                          size={18}
                          className="text-red-400 hover:text-red-600 transition-all duration-200"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile view - card layout */}
          </div>
          <div className="sm:hidden space-y-4 space-x-2 bg-transparent">
            {sortedExpense.map((expense) => (
              <div
                key={expense.id}
                className="bg-white p-4 rounded-lg shadow-sm w-full"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {expense.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formateDate(expense.date)}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(expense.id)}>
                    <Trash
                      size={18}
                      className="text-red-400 hover:text-red-600"
                    />
                  </button>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className={`${getCategoryTextColor(expense.category)}`}>
                    {expense.category.charAt(0).toUpperCase() +
                      expense.category.slice(1)}
                  </span>
                  <span className="font-medium">
                    {formateCurrency(expense.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
