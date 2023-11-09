import { memo } from "react";
import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

const DeleteModal = memo(
  ({ handleShowDeleteModal, handleTaskAction, currentTask }: any) => {
    const handleDeleteAction = () => {
      const deleteAction = {
        type: "DELETE",
        task: currentTask,
      };
      handleTaskAction(deleteAction);
      handleShowDeleteModal(false, null);
    };

    return (
      <Modal>
        <div className="delete-modal">
          <p>Are you sure you want to delete this task?</p>
          <div className="delete-modal__actions">
            <Button title="Delete" onClick={handleDeleteAction} />
            <Button title="Cancel" outline onClick={handleDeleteAction} />
          </div>
        </div>
      </Modal>
    );
  }
);

export default DeleteModal;
