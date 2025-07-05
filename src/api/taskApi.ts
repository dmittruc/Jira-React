import axiosInstance from './axios';

export const fetchTaskApi = async (projectId: number, taskId: number) => {
  const res = await axiosInstance.get(`/projects/${projectId}/tasks/${taskId}`);
  return res.data;
};
