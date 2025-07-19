import React from 'react';
import { Toaster } from 'react-hot-toast';

const DashBoardLayout = ({ children }) => {
  const customBox = 'max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-4';
  return (
    <div className="min-h-screen  bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <header className="bg-white shadow-sm ">
        <div className={customBox}>
          <div className="flex justify-center md:justify-between items-center">
            <h1 className="text-2xl font-bold text-expense ">
              Budger Wow Tracker
            </h1>
            <p className="hidden md:block text-gray-500">
              Track your expense with ease
            </p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer
        className={`${customBox} bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]`}
      >
        <div>
          <p className="text-[10px] lg:text-sm text-center text-gray-500">
            Budget Wow Tacker &copy; {new Date().getFullYear()} . Made with ❤️
            by B.K .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashBoardLayout;
