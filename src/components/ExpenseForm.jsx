import { useState } from 'react';
import toast from 'react-hot-toast';
import { useExpense } from './../context/UseExpense';
import formCategoryOptions from './../utils/categoryOptions';

const ExpenseForm = () => {
  const Expense = useExpense();
  const { addExpense } = Expense;

  const inputStyle =
    'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all';
  const labelStyle = 'block text-sm font-medium text-gray-700 mb-1';
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });
  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.description.trim()) {
        throw new Error('Please enter a description');
      }
      if (
        !formData.amount ||
        isNaN(Number(formData.amount)) ||
        Number(formData.amount) <= 0
      ) {
        throw new Error('Please enter a valid amount');
      }
      addExpense({
        description: formData.description.trim(),
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
      });
      setFormData({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
      });
      console.log(formData);

      toast.success('Expense Added Successfully');
    } catch (error) {
      toast.error('Failed to add Expense', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-expense-dark mb-6 text-center">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <input
            className={inputStyle}
            name="description"
            id="description"
            type="text"
            value={formData.description}
            placeholder="what did you expend on ?"
            onChange={handleFormData}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="amount" className={labelStyle}>
            Amount
          </label>
          <input
            className={inputStyle}
            name="amount"
            id="amount"
            type="number"
            value={formData.amount}
            placeholder="0.00"
            onChange={handleFormData}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelStyle}>
            Category
          </label>
          <select
            className={inputStyle}
            name="category"
            id="category"
            value={formData.category}
            placeholder="0.00"
            onChange={handleFormData}
            disabled={isSubmitting}
          >
            {formCategoryOptions.map((category) => {
              return (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelStyle}>
            date
          </label>
          <input
            type="date"
            className={inputStyle}
            name="date"
            id="date"
            value={formData.date}
            onChange={handleFormData}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-expense text-white font-medium focus:outline-none focus:ring-2 focus:ring-expense-light  py-2 hover:bg-expense-dark transition-all rounded-md"
        >
          {isSubmitting ? 'Adding ...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
