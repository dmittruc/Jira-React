import axiosInstance from './axios';

export const fetchTasksApi = async (projectId: number) => {
  const res = await axiosInstance.get(`/projects/${projectId}/tasks/`);
  return res.data;
};

export const deleteTasksApi = async (projectId: number, taskId: number) => {
  const res = await axiosInstance.delete(
    `/projects/${projectId}/tasks/${taskId}`
  );
  return res.data;
};

export const createTasksApi = async (
  projectId: number,
  title: string,
  description: string,
  statusId: number,
  typeId: number,
  userId: number,
  files?: File[]
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('statusId', statusId.toString());
  formData.append('typeId', typeId.toString());
  formData.append('userId', userId.toString());
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  }
  const res = await axiosInstance.post(
    `/projects/${projectId}/tasks`,
    formData
  );
  return res.data;
};

export const updateTasksApi = async (
  projectId: number,
  taskId: number,
  title: string,
  description: string,
  statusId: number,
  typeId: number,
  userId: number,
  files?: File[]
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('statusId', statusId.toString());
  formData.append('typeId', typeId.toString());
  formData.append('userId', userId.toString());
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  }
  const res = await axiosInstance.put(
    `/projects/${projectId}/tasks/${taskId}`,
    formData
  );
  return res.data;
};
