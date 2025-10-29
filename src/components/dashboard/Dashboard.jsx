import { useAuth } from '../../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Please log in to continue</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {currentUser.role === 'student' ? (
        <StudentDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}