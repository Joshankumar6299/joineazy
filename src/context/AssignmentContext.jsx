import { createContext, useContext, useState, useEffect } from 'react';
import { mockAssignments, mockSubmissions } from '../data/mockData';

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const storedAssignments = localStorage.getItem('assignments');
    const storedSubmissions = localStorage.getItem('submissions');
    
    setAssignments(storedAssignments ? JSON.parse(storedAssignments) : mockAssignments);
    setSubmissions(storedSubmissions ? JSON.parse(storedSubmissions) : mockSubmissions);
  }, []);

  const createAssignment = (newAssignment) => {
    const assignment = {
      ...newAssignment,
      id: assignments.length + 1,
    };
    const updatedAssignments = [...assignments, assignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  };

  const submitAssignment = (assignmentId, studentId) => {
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId,
      studentId,
      submitted: true,
      submissionDate: new Date().toISOString(),
    };
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const deleteAssignment = (assignmentId) => {
    const updatedAssignments = assignments.filter(a => a.id !== assignmentId);
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

    // Remove any submissions related to the deleted assignment
    const updatedSubmissions = submissions.filter(s => s.assignmentId !== assignmentId);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const getStudentSubmissions = (studentId) => {
    return submissions.filter(sub => sub.studentId === studentId);
  };

  const getAssignmentSubmissions = (assignmentId) => {
    return submissions.filter(sub => sub.assignmentId === assignmentId);
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        submissions,
        createAssignment,
        submitAssignment,
        deleteAssignment,
        getStudentSubmissions,
        getAssignmentSubmissions,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};