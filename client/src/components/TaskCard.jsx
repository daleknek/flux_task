import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TaskCard.module.css";

function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className={styles.card}>
      <h3
        style={{
          color: "#0079bf",
          fontSize: "20px",
          margin: "0",
        }}
      >
        {task.title}
      </h3>
      <div style={{ alignSelf: "flex-end" }}>
        <Button
          size="small"
          onClick={() => onEdit(task)}
          style={{ marginRight: "5px" }}
        >
          <EditIcon fontSize="small" />
        </Button>
        <Button size="small" onClick={() => onDelete(task._id)}>
          <DeleteIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}

export default TaskCard;
