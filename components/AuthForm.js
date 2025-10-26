import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Simple email validation regex (can be more robust if needed)
  const isValidEmail = (emailString) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailString);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setAuthLoading(true);

    const trimmedEmail = email.trim(); // Trim whitespace

    if (!isValidEmail(trimmedEmail)) { // Client-side validation
      setError("Please enter a valid email address.");
      setAuthLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setAuthLoading(true);

    const trimmedEmail = email.trim(); // Trim whitespace

    if (!isValidEmail(trimmedEmail)) { // Client-side validation
      setError("Please enter a valid email address.");
      setAuthLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Authentication</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={authLoading}
        >
          {authLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <button
          onClick={handleSignUp}
          className="mt-2 w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={authLoading}
        >
          {authLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}

