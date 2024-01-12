import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./TaskModal.module.css";
import dayjs from "dayjs";

function TaskModal({
  open,
  handleClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskDate,
  createTask,
  updateTask,
  taskId,
}) {
  const [value, setValue] = useState(dayjs());

  return (
    <Modal open={open} onClose={handleClose} className={styles.modal}>
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
            style={{ width: "100%", height: "500px", marginBottom: "50px" }}
            value={taskDescription}
            onChange={setTaskDescription}
          />
          {!taskId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => createTask()}
            >
              Create Task
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                updateTask(taskId, taskTitle, taskDescription, taskDate)
              }
            >
              Update Task
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
