import { CircularProgress } from '@mui/material';
import { ITask } from '../../../interfaces';
import TasksListItem from '../../listItems/TaskListItem';

interface IProps {
  loading: boolean;
  error: any;
  tasks: ITask[];
  projectId: number;
}

const TaskList = ({ loading, error, tasks, projectId }: IProps) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>zxcerror</div>;
  }
  if (tasks.length === 0) {
    return <div>notasks</div>;
  }
  return (
    <>
      {tasks.map((task: ITask) => {
        return (
          <div key={task.id}>
            <TasksListItem task={task} projectId={projectId} />
          </div>
        );
      })}
    </>
  );
};

export default TaskList;
