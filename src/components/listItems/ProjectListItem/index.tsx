import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjects from '../../../hooks/useProjects';
import { IProject } from '../../../interfaces';

interface IProps {
  project: IProject;
}

const ProjectListItem = ({ project }: IProps) => {
  const navigate = useNavigate();

  const { deleteProject } = useProjects();

  const handleDeleteProject = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      deleteProject(project.id, onSuccess);
    },
    [project]
  );

  const onSuccess = () => {
    console.log('delete project', project.id);
  };

  const goToProjectDetails = useCallback(() => {
    navigate(`/projects/${project.id}`);
  }, [project]);

  const goToProjectEditor = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      navigate(`/projects/edit/${project.id}`);
    },
    [project]
  );

  return (
    <div onClick={goToProjectDetails}>
      <div onClick={goToProjectEditor}>Edit</div>
      <div onClick={handleDeleteProject}>Delete</div>
      <p>
        <span>project title: </span>
        <span>{project.title}</span>
      </p>
      <p>
        <span>project description: </span>
        <span>{project.description}</span>
      </p>
      <span>{project.id}</span>
    </div>
  );
};

export default ProjectListItem;
