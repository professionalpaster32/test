import React, { useState } from 'react';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext'; // Corrected import path/filename

export default function AccountSidebar({ setAccountSidebarOpen }) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordChangeSuccess(false);
    if (newPassword !== repeatPassword) {
      setError("New passwords don't match.");
      return;
    }
    if (!user) {
      setError("No user logged in.");
      return;
    }
    setAuthLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPasswordChangeSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setRepeatPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <aside className="w-80 bg-gray-800 text-white p-4 shadow-xl z-10 fixed right-0 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Account Settings</h2>
        <button onClick={() => setAccountSidebarOpen(false)} className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {passwordChangeSuccess && <p className="text-green-400 text-sm mb-4">Password updated successfully!</p>}
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-gray-500 focus:border-gray-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-gray-500 focus:border-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-300">Repeat New Password</label>
            <input
              type="password"
              id="repeatPassword"
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-gray-500 focus:border-gray-500"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={authLoading}
          >
            {authLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </section>
    </aside>
  );
}
