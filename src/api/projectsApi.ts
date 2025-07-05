import axiosInstance from './axios';

export const fetchProjectsApi = async () => {
  const res = await axiosInstance.get('/projects');
  return res.data;
};

export const fetchProjectApi = async (projectId: number) => {
  const res = await axiosInstance.get(`/projects/${projectId}`);
  return res.data;
};

export const deleteProjectApi = async (projectId: number) => {
  const res = await axiosInstance.delete(`/projects/${projectId}`);
  return res.data;
};

export const createProjectApi = async (title: string, description: string) => {
  const res = await axiosInstance.post(`/projects/`, {
    title,
    description,
  });
  return res.data;
};

export const updateProjectApi = async (
  projectId: number,
  title: string,
  description: string
) => {
  const res = await axiosInstance.put(`/projects/${projectId}`, {
    title,
    description,
  });
  return res.data;
};
