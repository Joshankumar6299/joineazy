import { AuthProvider } from './context/AuthContext';
import { AssignmentProvider } from './context/AssignmentContext';
import { useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen w-screen bg-gray-50 overflow-x-hidden">
      {currentUser && <Header />}
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-full">
          {currentUser ? <Dashboard /> : <Login />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AssignmentProvider>
        <AppContent />
      </AssignmentProvider>
    </AuthProvider>
  );
}

export default App;
