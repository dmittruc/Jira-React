import { useCallback, useEffect, useState } from 'react';
import { fetchTaskApi } from '../api/taskApi';
import { ITask } from '../interfaces';

const useTask = (projectId: string | undefined, taskId: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<ITask | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

  const fetchCurrentTask = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchTaskApi(
        parseInt(projectId!),
        parseInt(taskId!)
      );
      console.log(response);
      if (response.task) {
        setTask(response.task);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [projectId, taskId]);

  useEffect(() => {
    fetchCurrentTask();
  }, [projectId, taskId]);

  return { loading, error, task };
};
export default useTask;
