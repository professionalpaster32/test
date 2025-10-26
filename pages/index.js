import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Corrected import path/filename
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import AccountSidebar from '../components/AccountSidebar';

export default function Home() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header setSidebarOpen={setSidebarOpen} setAccountSidebarOpen={setAccountSidebarOpen} />

      <main className="flex-grow flex">
        {sidebarOpen && user && (
          <aside className="w-64 bg-gray-800 text-white p-4 shadow-xl z-10 transition-transform transform -translate-x-0 fixed md:relative h-full">
            <h2 className="text-lg font-semibold mb-4">Welcome</h2>
            <p className="text-sm">Logged in as:</p>
            <p className="text-md font-medium break-all">{user.email}</p>
            <p className="text-xs mt-2">({user.email.split('@')[0]})</p>
          </aside>
        )}

        <div className="flex-grow p-8 flex items-center justify-center">
          {!loading && (user ? (
            <h2 className="text-2xl font-semibold">Welcome, {user.email.split('@')[0]}!</h2>
          ) : (
            <AuthForm />
          ))}
        </div>

        {accountSidebarOpen && user && (
          <AccountSidebar setAccountSidebarOpen={setAccountSidebarOpen} />
        )}
      </main>
    </div>
  );
}
