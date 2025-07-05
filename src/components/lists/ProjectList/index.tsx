import { CircularProgress } from '@mui/material';
import { IProject } from '../../../interfaces';
import ProjectListItem from '../../listItems/ProjectListItem';

interface IProps {
  loading: boolean;
  projects: IProject[];
  error: any;
}

const ProjectList = ({ loading, projects, error }: IProps) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>error</div>;
  }
  if (projects.length === 0) {
    return <div>no projects</div>;
  }

  return (
    <>
      {projects.map((project: IProject) => {
        return (
          <div key={project.id}>
            <ProjectListItem project={project} />
          </div>
        );
      })}
    </>
  );
};

export default ProjectList;
