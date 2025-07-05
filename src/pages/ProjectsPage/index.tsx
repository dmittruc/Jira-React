import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../../components/lists/ProjectList';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';

const ProjectsPage = () => {
  const { projects, loading, error, fetchProjects, createProject } =
    useProjects();

  const { logOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSuccess = () => {
    console.log('onSuccess');
  };

  const goToProjectCreator = useCallback(() => {
    navigate('/projects/create');
  }, []);

  return (
    <div className="container">
      <h3>projects page</h3>
      <Button onClick={() => logOut(onSuccess)}>logout</Button>
      <Button onClick={goToProjectCreator}>Create project</Button>
      <ProjectList loading={loading} projects={projects} error={error} />
    </div>
  );
};

export default ProjectsPage;
