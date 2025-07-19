import { ExpenseProvider } from '../context/ExpenseContext';
import DashBoardLayout from './../layouts/DashBoardLayout';
import Dashboard from './../components/Dashboard';

const Index = () => {
  return (
    <ExpenseProvider>
      <DashBoardLayout>
        <Dashboard />
      </DashBoardLayout>
    </ExpenseProvider>
  );
};

export default Index;
