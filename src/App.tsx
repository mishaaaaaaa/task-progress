import { useEffect, useRef, useState } from "react";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { taskList } from "./data/taskList";
import { idGenerator } from "./helpers/helpers";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [tasksList, setTasksList] = useState([] as any);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { get } = useFetch("*somebaseUrl*");

  useEffect(() => {
    setTasksList(taskList as any);

    // ---------- so here i created simple custom fetch to get data from server;
    // ---------- it would fetch it and set to local state;
    // ---------- but due to lack of information in documentation regarding work with API i can`t fully implement functionality
    //

    // ------>>> get("urlToTaskList").then((resp: any) => setTasksList(resp)); <<<------
  }, []);

  const handleTaskAction = (action: any) => {
    const task: any = action.task;
    switch (action.type) {
      case "CREATE": {
        setTasksList((prevState: any) => [
          { ...task, id: idGenerator(prevState.length + 1) },
          ...prevState,
        ]);

        break;
      }
      case "UPDATE": {
        setTasksList((prevState: any) =>
          prevState.map((taskItem: any) =>
            taskItem.id === task.id ? task : taskItem
          )
        );
        break;
      }
      case "DELETE": {
        setTasksList((prevState: any) =>
          prevState.filter((taskItem: any) => taskItem.id !== task.id)
        );
        break;
      }
      default:
        console.error("Unpropriate action");
    }
    hadnleCloseAddEditModal();
  };

  const handleShowAddEditModal = (task: any) => {
    setCurrentTask(task);
    setShowAddEditModal(true);
  };

  const hadnleCloseAddEditModal = () => {
    setCurrentTask(null);
    setShowAddEditModal(false);
  };

  const handleShowDeleteModal = (modalStatus: any, taskItem: any) => {
    setShowDeleteModal(modalStatus);
    setCurrentTask(taskItem);
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={() => setShowAddEditModal(true)}
          />
        </div>
        <div className="task-container">
          {tasksList.map((task: any) => (
            <TaskCard
              task={task}
              key={task?.id}
              handleShowAddEditModal={handleShowAddEditModal}
              handleShowDeleteModal={handleShowDeleteModal}
              handleTaskAction={handleTaskAction}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          handleTaskAction={handleTaskAction}
          currentTask={currentTask}
          hadnleCloseAddEditModal={hadnleCloseAddEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleShowDeleteModal={handleShowDeleteModal}
          currentTask={currentTask}
          handleTaskAction={handleTaskAction}
        />
      )}
    </div>
  );
};

export default App;
