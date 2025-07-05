import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ITask } from '../interfaces';
import { TRootState } from '../store';

const useTaskById = (taskId: string) => {
  const tasks = useSelector<TRootState, ITask[]>(
    (state: TRootState) => state.tasks.tasks
  );
  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id == parseInt(taskId!));
  }, [taskId]);

  return { selectedTask };
};

export default useTaskById;
