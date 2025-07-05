import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Commentlist from '../../components/lists/CommentList';
import useComments from '../../hooks/useComments';
import useTaskById from '../../hooks/useTaskById';
import { ITask } from '../../interfaces';

interface IProps {
  task: ITask;
}

const TaskDetailsPage = ({ task }: IProps) => {
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const { comments, error, loading, fetchComments } = useComments(
    parseInt(projectId!),
    parseInt(taskId!)
  );

  const goToProjectDetails = useCallback(() => {
    navigate(`/projects/${projectId}`);
  }, [projectId]);

  const goToCommentCreator = useCallback(() => {
    navigate(`/projects/${projectId}/tasks/${taskId}/comments/create`);
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h3>task details page</h3>
      <p>
        <span>task title:</span>
        <span>{task?.title}</span>
      </p>
      <p>
        <span>task description:</span>
        <span>{task?.description}</span>
      </p>
      <Button onClick={goToCommentCreator} variant="contained">
        Create Comment
      </Button>
      <Button onClick={goToProjectDetails}>go to project details</Button>
      <Commentlist
        comments={comments}
        loading={loading}
        error={error}
        projectId={parseInt(projectId!)}
        taskId={parseInt(taskId!)}
      />
    </div>
  );
};

const TaskDetailsPageWrapper = () => {
  const { taskId } = useParams();
  const { selectedTask } = useTaskById(taskId!);

  if (!selectedTask) {
    return <div>no task</div>;
  }

  return <TaskDetailsPage task={selectedTask} />;
};

export default TaskDetailsPageWrapper;
