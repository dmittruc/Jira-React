import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProject } from '../interfaces';
import { TAppDispatch, TRootState } from '../store';
import {
  createProjectAsyncAction,
  deleteProjectsAsyncAction,
  projectsAsyncAction,
  updateProjectsAsyncAction,
} from '../store/actions/projectsActions';

const useProjects = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const projects = useSelector<TRootState, IProject[]>(
    (state: TRootState) => state.projects.projects
  );

  const loading = useSelector<TRootState, boolean>(
    (state: TRootState) => state.projects.loading
  );

  const error = useSelector<TRootState, any>(
    (state: TRootState) => state.projects.error
  );

  const fetchProjects = useCallback(() => {
    dispatch(projectsAsyncAction());
  }, []);

  const createProject = useCallback(
    (title: string, description: string, onSuccess?: () => void) => {
      dispatch(createProjectAsyncAction({ title, description, onSuccess }));
    },
    []
  );

  const updateProject = useCallback(
    (
      projectId: number,
      title: string,
      description: string,
      onSuccess?: () => void
    ) => {
      dispatch(
        updateProjectsAsyncAction({ projectId, title, description, onSuccess })
      );
    },
    []
  );

  const deleteProject = useCallback(
    (projectId: number, onSuccess: () => void) => {
      dispatch(deleteProjectsAsyncAction({ projectId, onSuccess }));
    },
    []
  );

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

export default useProjects;
