import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-indigo-600 shadow-lg h-16">
      <div className="w-full max-w-[2000px] mx-auto px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-2xl">
              Assignment Dashboard
            </div>
            {currentUser && (
              <div className="text-indigo-200 text-lg">
                {currentUser.role === 'admin' ? 'Professor Dashboard' : 'Student View'}
              </div>
            )}
          </div>
          {currentUser && (
            <div className="flex items-center space-x-6">
              <span className="text-white text-lg">
                Welcome, {currentUser.name}
              </span>
              <button
                onClick={logout}
                className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition-all text-lg font-semibold shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}