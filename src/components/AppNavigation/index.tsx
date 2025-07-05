import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommentCreatorPage from '../../pages/CommentCreatorPage ';
import CommentEditorPage from '../../pages/CommentEditorPage';
import ProjectCreatorPage from '../../pages/ProjectCreatorPage';
import ProjectDetailsPage from '../../pages/ProjectDetailsPage';
import ProjectEditorPage from '../../pages/ProjectEditorPage';
import ProjectsPage from '../../pages/ProjectsPage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import TaskDetailsPage from '../../pages/TaskDetailsPage.tsx';
import ProtectedRoute from '../ProtectedRoute';

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/create"
          element={
            <ProtectedRoute>
              <ProjectCreatorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/edit/:projectId"
          element={
            <ProtectedRoute>
              <ProjectEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId/tasks/:taskId/comments/create"
          element={
            <ProtectedRoute>
              <CommentCreatorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId/tasks/:taskId/comments/:commentId/edit"
          element={
            <ProtectedRoute>
              <CommentEditorPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/projects" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
