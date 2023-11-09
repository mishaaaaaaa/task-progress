import classNames from "classnames";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import { calculateProgress, calculateStatus } from "../../helpers/helpers";
import "./style.scss";

const TaskCard = ({
  task,
  handleShowAddEditModal,
  handleShowDeleteModal,
  handleTaskAction,
}: any) => {
  const { title, priority, status, progress } = task;

  const handleUpdateStatus = () => {
    const action = {
      type: "UPDATE",
      task: {
        ...task,
        progress: calculateProgress(task.progress),
        status: calculateStatus(calculateProgress(task.progress)),
      },
    };
    handleTaskAction(action);
  };

  return (
    <div className="task-card">
      <div className="flex w-100 ">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="card-body">
        <div className="flex">
          <span className="priority-title">Priority</span>
          <span className={classNames(`${priority}-priority`, "priority")}>
            {priority}
          </span>
        </div>
        <div className="task-status-wrapper">
          <button className="status" onClick={handleUpdateStatus}>
            {status}
          </button>
        </div>
        <div className="progress">
          <CircularProgressBar
            strokeWidth={2}
            sqSize={24}
            percentage={progress}
          />
        </div>
      </div>
      <div className="actions">
        <EditIcon
          className="mr-20 cp"
          onClick={() => handleShowAddEditModal(task)}
        />
        <DeleteIcon
          className="cp"
          onClick={() => handleShowDeleteModal(true, task)}
        />
      </div>
    </div>
  );
};

export default TaskCard;
