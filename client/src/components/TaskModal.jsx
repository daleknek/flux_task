import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./TaskModal.module.css";
import dayjs from "dayjs";
import UserDropdown from "./UserDropdown";

function TaskModal({
  openModal,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskDate,
  createTask,
  updateTask,
  taskId,
  closeModal,
  users,
  selectedUserId,
  onSelectUser,
}) {
  const [value, setValue] = useState(dayjs());

  return (
    <Modal open={openModal} onClose={closeModal} className={styles.modal}>
      <div className={styles.paper}>
        <div className={styles.container}>
          <div className={styles.textField}>
            <TextField
              label="Task Title"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              style={{ flexGrow: 1 }}
            />
            <p>Due Date:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Calendar"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </div>
          <ReactQuill
            style={{ width: "100%", height: "300px", marginBottom: "40px" }}
            value={taskDescription}
            onChange={setTaskDescription}
          />
          <div className={styles.userSelectContainer}>
            <UserDropdown
              users={users}
              // selectedUserId={selectedUserId}
              onSelectUser={onSelectUser}
            />
            <div>
              {taskId ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    updateTask(
                      taskId,
                      taskTitle,
                      taskDescription,
                      taskDate,
                      selectedUserId
                    )
                  }
                >
                  Update Task
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => createTask()}
                >
                  Create Task
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
