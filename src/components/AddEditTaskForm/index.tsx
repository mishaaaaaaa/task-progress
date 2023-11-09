import { memo } from "react";
import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { useEffect, useState } from "react";

const AddEditTaskForm = memo(
  ({ handleTaskAction, currentTask, hadnleCloseAddEditModal }: any) => {
    const [title, setTitle] = useState("");
    const [priorityStatus, setPriorityStatus] = useState("");
    const isEdit = !!currentTask;
    const modalTitle = isEdit ? "Edit Task" : "Add Task";
    const addEditBtnTitle = isEdit ? "Edit" : "Add";

    useEffect(() => {
      if (!!currentTask) {
        setTitle(currentTask.title);
        setPriorityStatus(currentTask.priority);
      }
    }, []);

    const handleAddPriority = (priority: any) => {
      setPriorityStatus(priority);
    };

    const handleFormTask = (event: any) => {
      event.preventDefault();
      let newTask = {} as any;

      if (!!currentTask) {
        newTask = {
          ...currentTask,
          title: title,
          priority: priorityStatus ? priorityStatus : currentTask.priority,
        };
      } else {
        newTask = {
          title,
          priority: priorityStatus,
          status: "To Do",
          progress: 0,
        };
      }

      if (!!title) {
        const action = {
          type: newTask.id ? "UPDATE" : "CREATE",
          task: newTask,
        };
        handleTaskAction(action);
      }
    };

    return (
      <Modal>
        <form>
          <div className="add-edit-modal">
            <div className="flx-between">
              <span className="modal-title">{modalTitle}</span>
              <Close className="cp" onClick={hadnleCloseAddEditModal} />
            </div>
            <Input
              label="Task"
              placeholder="Type your task here..."
              onChange={(e: any) => setTitle(e.target.value)}
              name="title"
              value={title}
            />
            <div className="modal-priority">
              <span>Priority</span>
              <ul className="priority-buttons">
                {["high", "medium", "low"].map((priority) => (
                  <li
                    key={priority}
                    className={classNames({
                      [`${priority}-selected`]: priorityStatus === priority,
                      [priority]: true,
                    })}
                    onClick={() => handleAddPriority(priority)}
                  >
                    {priority}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flx-right mt-50">
              <Button
                title={addEditBtnTitle}
                onClick={handleFormTask}
                disabled={!title}
              />
            </div>
          </div>
        </form>
      </Modal>
    );
  }
);

export default AddEditTaskForm;
