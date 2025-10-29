import { useState } from 'react';
import { useAssignments } from '../../context/AssignmentContext';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const { assignments, submissions, submitAssignment } = useAssignments();
  const [confirmingSubmission, setConfirmingSubmission] = useState(null);

  const studentSubmissions = submissions.filter(
    sub => sub.studentId === currentUser.id
  );

  const handleSubmitClick = (assignmentId) => {
    setConfirmingSubmission(assignmentId);
  };

  const handleConfirmSubmission = (assignmentId) => {
    submitAssignment(assignmentId, currentUser.id);
    setConfirmingSubmission(null);
  };

  const isSubmitted = (assignmentId) => {
    return studentSubmissions.some(
      sub => sub.assignmentId === assignmentId && sub.submitted
    );
  };

  return (
    <div className="h-full w-full overflow-auto p-8">
      <div className="max-w-[2000px] mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <div className="text-gray-600">
            Total Assignments: {assignments.length}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {assignment.title}
            </h2>
            <p className="text-gray-600">{assignment.description}</p>
            <div className="text-sm text-gray-500">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </div>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 block"
            >
              Submit via Drive
            </a>
            {isSubmitted(assignment.id) ? (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                Submitted
              </div>
            ) : confirmingSubmission === assignment.id ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Are you sure you want to mark this as submitted?
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConfirmSubmission(assignment.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmingSubmission(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleSubmitClick(assignment.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
              >
                Mark as Submitted
              </button>
            )}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}