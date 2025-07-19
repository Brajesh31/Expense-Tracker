import { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('UseExpenses must be uses within a  ExpenseProvider');
  }
  return context;
};
