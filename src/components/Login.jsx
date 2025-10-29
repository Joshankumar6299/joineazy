import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!login(email)) {
      setError('Invalid email. Please try again.');
      return;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl sm:p-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Assignment Dashboard
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Sign in to access your workspace
          </p>
        </div>

        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label htmlFor="email-address" className="block text-lg font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <div className="text-lg font-medium text-red-600 text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>

          <div className="space-y-2 text-center text-lg text-gray-600">
            <p className="font-medium">Demo Accounts</p>
            <p>Student: john@student.edu</p>
            <p>Professor: williams@professor.edu</p>
          </div>
        </form>
      </div>
    </div>
  );
}