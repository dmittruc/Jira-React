import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import useProjects from '../../hooks/useProjects';
interface IProps {
  projectId: number;
  currentTitle: string;
  currentDescription: string;
}
const ProjectEditorPage = ({
  projectId,
  currentTitle,
  currentDescription,
}: IProps) => {
  const [title, setTitle] = useState<string>(currentTitle);
  const [description, setDescription] = useState<string>(currentDescription);

  const { updateProject } = useProjects();
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(`/projects`);
  };

  const handleUpdateProject = () => {
    updateProject(projectId, currentTitle, currentDescription, onSuccess);
  };

  return (
    <div>
      <div>
        <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div>
        <Button onClick={handleUpdateProject}>Update project</Button>
      </div>
    </div>
  );
};

const ProjectEditorPageWrapper = () => {
  const { projectId } = useParams();

  const { project, error, loading } = useProject(projectId);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !project) {
    return <div>no project</div>;
  }

  return (
    <ProjectEditorPage
      projectId={parseInt(projectId!)}
      currentTitle={project.title}
      currentDescription={project.description}
    />
  );
};

export default ProjectEditorPageWrapper;
