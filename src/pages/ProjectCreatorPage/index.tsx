import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';

const ProjectCreatorPage = () => {
  const { createProject } = useProjects();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const onSuccess = () => {
    navigate(`/projects`);
  };

  const handleCreateProject = () => {
    createProject(title, description, onSuccess);
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
        <Button onClick={handleCreateProject}>Create project</Button>
      </div>
    </div>
  );
};

export default ProjectCreatorPage;
