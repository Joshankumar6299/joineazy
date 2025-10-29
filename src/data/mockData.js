export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@student.edu',
    role: 'student',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@student.edu',
    role: 'student',
  },
  {
    id: 3,
    name: 'Prof. Williams',
    email: 'williams@professor.edu',
    role: 'admin',
  },
];

export const mockAssignments = [
  {
    id: 1,
    title: 'React Fundamentals Project',
    description: 'Create a simple React application demonstrating core concepts',
    dueDate: '2025-11-15',
    driveLink: 'https://drive.google.com/assignment1',
    createdBy: 3, // Prof. Williams
  },
  {
    id: 2,
    title: 'State Management Exercise',
    description: 'Implement state management using Context API or Redux',
    dueDate: '2025-11-20',
    driveLink: 'https://drive.google.com/assignment2',
    createdBy: 3,
  },
];

export const mockSubmissions = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    submitted: true,
    submissionDate: '2025-11-10',
  },
  {
    id: 2,
    assignmentId: 1,
    studentId: 2,
    submitted: false,
  },
];