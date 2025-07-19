import { createContext, useEffect, useReducer } from 'react';

const ExpenseContext = createContext();

const initialState = {
  expenses: JSON.parse(localStorage.getItem('expenses')) || [],
  Loading: false,
  error: null,
};

const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expense.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'SET_LOADING':
      return { ...state, Loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialState);
  //save expense to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  }, [state.expenses]);
  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = { ...expense, id: crypto.randomUUID() };
      dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    },
    deleteExpense: (id) => {
      dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
    },
    updateExpense: (expense) => {
      dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
    },
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export { ExpenseProvider, ExpenseContext };
