import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFile, IStatus, ITask, IType, IUser } from '../interfaces';
import { TAppDispatch, TRootState } from '../store';
import {
  createTasksAsyncAction,
  deleteTasksAsyncAction,
  tasksAsyncAction,
  updateTasksAsyncAction,
} from '../store/actions/tasksActions';

const useTasks = (projectId: number) => {
  const dispatch = useDispatch<TAppDispatch>();

  const tasks = useSelector<TRootState, ITask[]>(
    (state: TRootState) => state.tasks.tasks
  );

  const loading = useSelector<TRootState, boolean>(
    (state: TRootState) => state.tasks.loading
  );

  const error = useSelector<TRootState, any>(
    (state: TRootState) => state.tasks.error
  );

  const fetchTasks = useCallback(() => {
    dispatch(tasksAsyncAction({ projectId }));
  }, [projectId]);

  const createTask = useCallback(
    (
      title: string,
      description: string,
      status: IStatus,
      type: IType,
      user: IUser,
      files: File[],
      onSuccess?: () => void
    ) => {
      dispatch(
        createTasksAsyncAction({
          projectId,
          title,
          description,
          status,
          type,
          user,
          files,
          onSuccess,
        })
      );
    },
    [projectId]
  );

  const updateTask = useCallback(
    (
      taskId: number,
      title: string,
      description: string,
      status: IStatus,
      type: IType,
      user: IUser,
      files: File[],
      oldFiles: IFile[],
      onSuccess?: () => void
    ) => {
      dispatch(
        updateTasksAsyncAction({
          projectId,
          taskId,
          title,
          description,
          status,
          type,
          user,
          files,
          oldFiles,
          onSuccess,
        })
      );
    },
    [projectId]
  );

  const deleteTask = useCallback(
    (taskId: number, onSuccess?: () => void) => {
      dispatch(
        deleteTasksAsyncAction({
          projectId,
          taskId,
          onSuccess,
        })
      );
    },
    [projectId]
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
