import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

export default function Header({ setSidebarOpen, setAccountSidebarOpen }) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State moved here

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSidebarOpen(false); // Close sidebar on logout
      setAccountSidebarOpen(false); // Close account sidebar on logout
      setDropdownOpen(false); // Close dropdown on logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="w-full p-4 bg-gray-900 text-white shadow-md flex justify-between items-center">
      <div className="flex items-center">
        {user && (
          <button onClick={() => setSidebarOpen(prev => !prev)} className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        )}
        <h1 className="text-xl font-bold ml-4">Showcase App</h1>
      </div>
      {user && (
        <div className="relative">
          <button onClick={toggleDropdown} className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20">
              <button onClick={() => { setAccountSidebarOpen(true); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">Account</button>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
