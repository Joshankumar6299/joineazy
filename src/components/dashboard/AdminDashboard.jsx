import { useState } from 'react';
import { useAssignments } from '../../context/AssignmentContext';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { assignments, submissions, createAssignment, getAssignmentSubmissions, submitAssignment, deleteAssignment } = useAssignments();

  const [isCreating, setIsCreating] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '', driveLink: '' });

  const students = mockUsers.filter((user) => user.role === 'student');

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    createAssignment({ ...newAssignment, createdBy: currentUser.id });
    setNewAssignment({ title: '', description: '', dueDate: '', driveLink: '' });
    setIsCreating(false);
  };

  const getSubmissionProgress = (assignmentId) => {
    const assignmentSubmissions = getAssignmentSubmissions(assignmentId);
    return students.length ? (assignmentSubmissions.length / students.length) * 100 : 0;
  };

  // state for viewing submissions list
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const openSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const closeSubmissions = () => setSelectedAssignment(null);

  return (
    <div className="h-full w-full overflow-auto p-8">
      <div className="max-w-[2000px] mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Assignments</h1>
            <p className="text-gray-600 mt-2">Total Students: {students.length}</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-lg font-semibold shadow-sm hover:shadow-md transition-all"
          >
            Create Assignment
          </button>
        </div>

        {isCreating && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Drive Link</label>
                  <input
                    type="url"
                    required
                    value={newAssignment.driveLink}
                    onChange={(e) => setNewAssignment({ ...newAssignment, driveLink: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsCreating(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {assignments
            .filter((assignment) => assignment.createdBy === currentUser.id)
            .map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-lg shadow-lg p-8 space-y-6 hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900">{assignment.title}</h2>
                <p className="text-gray-600">{assignment.description}</p>
                <div className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Submission Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${getSubmissionProgress(assignment.id)}%` }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{getAssignmentSubmissions(assignment.id).length} of {students.length} submitted</p>
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openSubmissions(assignment)}
                        className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-md text-sm hover:bg-indigo-200"
                      >
                        View Submissions
                      </button>
                      <button
                        onClick={() => {
                          const ok = window.confirm('Delete this assignment? This will also remove its submissions.');
                          if (ok) {
                            deleteAssignment(assignment.id);
                            // close modal if it was open for this assignment
                            if (selectedAssignment && selectedAssignment.id === assignment.id) {
                              closeSubmissions();
                            }
                          }
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Submissions modal */}
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Submissions — {selectedAssignment.title}</h3>
                <button onClick={closeSubmissions} className="text-gray-600 hover:text-gray-800">Close</button>
              </div>
              <div className="space-y-4 max-h-80 overflow-auto">
                {/* Submitted students */}
                <div>
                  <h4 className="font-medium">Submitted</h4>
                  <ul className="mt-2 space-y-2">
                    {getAssignmentSubmissions(selectedAssignment.id).length === 0 && (
                      <li className="text-sm text-gray-600">No submissions yet.</li>
                    )}
                    {getAssignmentSubmissions(selectedAssignment.id).map((sub) => {
                      const student = students.find(s => s.id === sub.studentId) || { name: sub.studentId, email: '' };
                      return (
                        <li key={sub.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded">Submitted</div>
                            <div className="text-sm text-gray-500">{new Date(sub.submissionDate).toLocaleString()}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Not yet submitted */}
                <div>
                  <h4 className="font-medium">Not Submitted</h4>
                  <ul className="mt-2 space-y-2">
                    {students
                      .filter((s) => !getAssignmentSubmissions(selectedAssignment.id).some(sub => sub.studentId === s.id))
                      .map((s) => (
                        <li key={s.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm text-gray-500">{s.email}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded">Not submitted</div>
                            <button
                              onClick={() => submitAssignment(selectedAssignment.id, s.id)}
                              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              Mark submitted
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
