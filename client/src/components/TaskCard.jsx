import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TaskCard.module.css";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

function TaskCard({ task, onDelete, onEdit }) {
  const username = task.user?.username;

  return (
    <div className={styles.card}>
      <h3
        style={{
          color: "#0079bf",
          fontSize: "20px",
          margin: "0 0 10px 0",
        }}
      >
        {task.title}
      </h3>
      <Chip icon={<FaceIcon />} label={username} variant="outlined" />
      <div style={{ alignSelf: "flex-end" }}>
        <IconButton
          size="small"
          onClick={() => onEdit(task)}
          style={{ marginRight: "5px" }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(task._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

export default TaskCard;
