import { Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskList from '../../components/lists/TaskList';
import useProject from '../../hooks/useProject';
import useTasks from '../../hooks/useTasks';
import { IProject } from '../../interfaces';

interface IProps {
  project: IProject;
}

const ProjectDetailsPage = ({ project }: IProps) => {
  const navigate = useNavigate();
  const { tasks, loading, error, fetchTasks } = useTasks(project.id!);

  const goToProjectsList = useCallback(() => {
    navigate(`/projects/`);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h3>project details page</h3>
      <p>
        <span>project title: </span>
        <span>{project?.title}</span>
      </p>
      <p>
        <span>project description: </span>
        <span>{project?.description}</span>
      </p>
      <Button onClick={goToProjectsList}>go to project list</Button>
      <TaskList
        loading={loading}
        error={error}
        tasks={tasks}
        projectId={project.id}
      />
    </div>
  );
};

const ProjectDetailsPageWrapper = () => {
  const { projectId } = useParams();
  const { project, loading, error } = useProject(projectId);
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    console.log(error);
    <div>error</div>;
  }

  if (!project) {
    <div>no project</div>;
  }
  return <ProjectDetailsPage project={project!} />;
};

export default ProjectDetailsPageWrapper;
