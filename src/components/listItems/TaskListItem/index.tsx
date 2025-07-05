import { useNavigate } from 'react-router-dom';
import { ITask } from '../../../interfaces';

interface IProps {
  task: ITask;
  projectId: number;
}

const TasksListItem = ({ task, projectId }: IProps) => {
  const navigate = useNavigate();
  const goToTaskDetails = () => {
    navigate(`/projects/${projectId}/tasks/${task.id}`);
  };
  return (
    <button onClick={goToTaskDetails}>
      <p>
        <span>task title: </span>
        <span>{task.title}</span>
      </p>
      <p>
        <span>task description: </span>
        <span>{task.description}</span>
      </p>
    </button>
  );
};

export default TasksListItem;
