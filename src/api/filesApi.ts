import axiosInstance from './axios';

export const deleteFileApi = async (fileId: number) => {
  const res = await axiosInstance.delete(`/files/${fileId}`);
  return res.data;
};
