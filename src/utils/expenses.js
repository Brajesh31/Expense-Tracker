export const formateCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formateDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('un-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
};

export const getExpensesByCategory = (expenses) => {
  const categories = {
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Shopping: 0,
    Utilities: 0,
    Health: 0,
    Others: 0,
  };

  expenses.forEach((expense) => {
    return (categories[expense.category] += expense.amount);
  });
  return categories;
};

export const getTotalExpense = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getChartData = (expenses) => {
  const expensesByCategory = getExpensesByCategory(expenses);
  return Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
};

export const getCategoryTextColor = (category) => {
  const colors = {
    Food: 'text-red-500',
    Transport: 'text-blue-500',
    Entertainment: 'text-yellow-500',
    Shopping: 'text-green-500',
    Utilities: 'text-purple-500',
    Health: 'text-pink-500',
    Others: 'text-indigo-500',
  };
  return colors[category] || 'text-gray-500';
};

export const getMonthName = (date) => {
  return date.toLocaleDateString('default', { month: 'long' });
};

// export const getExpensesByMonth = (expenses, numMonths = 6) => {
//   const now = new Date();
//   const result = {};

//   for (let i = 0; i < numMonths; i++) {
//     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const monthYear = `${getMonthName(d)} ${d.getFullYear()}`;
//     result[monthYear] = 0;
//   }
//   expenses.forEach((expense) => {
//     const expenseDate = new Date(expense.date);
//     const monthYear = `${getMonthName(
//       expenseDate
//     )} ${expenseDate.getFullYear()}`;
//     if (result[monthYear] !== undefined) {
//       result[monthYear] += expense.amount;
//     }
//   });
//   return result;
// };

export const getExpensesByMonth = (expenses, numMonths = 6) => {
  const now = new Date();
  const result = {};

  for (let i = 0; i < numMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthYear = `${getMonthName(d)} ${d.getFullYear()}`;
    result[monthYear] = 0;
  }

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const monthYear = `${getMonthName(
      expenseDate
    )} ${expenseDate.getFullYear()}`;
    if (result[monthYear] !== undefined) {
      result[monthYear] += expense.amount;
    }
  });

  return result;
};
