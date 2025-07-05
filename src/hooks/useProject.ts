import { useCallback, useEffect, useState } from 'react';
import { fetchProjectApi } from '../api/projectsApi';
import { IProject } from '../interfaces';

const useProject = (projectId: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

  const fetchCurrentProject = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchProjectApi(parseInt(projectId!));
      if (response.project) {
        setProject(response.project);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchCurrentProject();
  }, [projectId]);

  return { loading, error, project };
};
export default useProject;
