import React, { useState, useEffect } from "react";
import { Button, Typography, Input, IconButton } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "./TaskModal.jsx";
import TaskCard from "./TaskCard.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useColumnsData } from "./LocalContext.js";
import styles from "./Column.module.css";
import dayjs from "dayjs";
import {
  updateColumnName,
  updateColumnWipLimit,
  createTask,
  deleteTask,
  updateTask,
  updateColumn,
  fetchUsers,
} from "../services/apiService.js";

function Column({ column, deleteColumn }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(dayjs());
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnsData, setColumnsData] = useColumnsData();
  const [editingTaskId, setEditingTaskId] = useState("");
  const [wipLimit, setWIPLimit] = useState("5");
  const [isEditingWIPLimit, setIsEditingWIPLimit] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  //User functions

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
    console.log("Selected user:", userId);
  };

  //Column functions

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameSave = async () => {
    setIsEditingName(false);

    try {
      await updateColumnName(column._id, editedName);
      const updatedArray = columnsData.map((item, index) =>
        item._id === column._id ? { ...item, name: editedName } : item
      );
      setColumnsData(updatedArray);
    } catch (error) {
      console.error("Error updating column name:", error);
    }
  };

  const handleWipChange = (event) => {
    setWIPLimit(event.target.value);
  };

  const handleEditWipLimit = () => {
    setIsEditingWIPLimit(true);
  };

  const handleSaveWipLimit = async () => {
    setIsEditingWIPLimit(false);

    try {
      await updateColumnWipLimit(column._id, wipLimit);
      const updatedArray = columnsData.map((item, index) =>
        item._id === column._id ? { ...item, wip: wipLimit } : item
      );
      setColumnsData(updatedArray);
    } catch (error) {
      console.error("Error updating WIP limit:", error);
    }
  };

  // Task functions

  const tasks = column.tasks || [];

  const handleCreateTask = async () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      column: column._id,
      user: selectedUserId,
    };
    console.log("New task:", newTask);
    try {
      const response = await createTask(newTask);

      const createdTask = response.data;
      const updatedColumnTaskData = {
        tasks: [...column.tasks, createdTask],
      };

      await updateColumn(column._id, updatedColumnTaskData);

      const updatedColumnsData = columnsData.map((col) => {
        if (col._id === column._id) {
          return {
            ...col,
            tasks: [...col.tasks, createdTask],
          };
        }
        return col;
      });

      setColumnsData(updatedColumnsData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (
    taskId,
    updatedTitle,
    updatedDescription,
    updatedDate,
    selectedUserId
  ) => {
    try {
      const currentTaskData = {
        _id: taskId,
        title: updatedTitle,
        description: updatedDescription,
        date: updatedDate,
        user: selectedUserId,
      };
      await updateTask(taskId, currentTaskData);

      const updatedColumnsData = columnsData.map((col) => {
        if (col._id === column._id) {
          return {
            ...col,
            tasks: col.tasks.map((task) =>
              task._id === taskId ? currentTaskData : task
            ),
          };
        }
        return col;
      });

      setColumnsData(updatedColumnsData);
    } catch (error) {
      console.error("Error updating task:", error);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedColumnsData = columnsData.map((column) => {
        const updatedTasks = column.tasks.filter((task) => task._id !== taskId);
        return {
          ...column,
          tasks: updatedTasks,
        };
      });
      setColumnsData(updatedColumnsData);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setSelectedUserId(task.user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearState();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    clearState();
  };

  const clearState = () => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate(dayjs());
    setSelectedUserId("");
  };

  return (
    <>
      <div className={styles.column}>
        <div className={styles.stickyContent}>
          {isEditingName || !column.name ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                placeholder="Enter column name"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleNameSave}
                onKeyDown={(event) => event.key === "Enter" && handleNameSave()}
                autoFocus
                style={{ fontSize: "18px", fontWeight: "bold" }}
              />
              <IconButton
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                onClick={deleteColumn}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                onClick={handleEditName}
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {column.name}
              </Typography>
              <IconButton
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                onClick={deleteColumn}
                disabled={column.tasks.length > 0}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          {!isEditingWIPLimit ? (
            <Typography
              variant="body2"
              onClick={handleEditWipLimit}
              style={{ marginBottom: "10px" }}
            >
              Tasks: {tasks.length}/{wipLimit}
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <Typography variant="body2" style={{ marginRight: "5px" }}>
                WIP Limit:
              </Typography>
              <Input
                type="number"
                value={wipLimit}
                onChange={handleWipChange}
                onBlur={handleSaveWipLimit}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleSaveWipLimit()
                }
                style={{ width: "50px", fontSize: "12px" }}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className={styles.container}>
          <Droppable
            droppableId={column._id}
            type="task"
            isDropDisabled={Number(column.tasks.length) === Number(wipLimit)}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: "100px" }}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggableCard}
                      >
                        <TaskCard
                          task={task}
                          username={
                            users.find((user) => user._id === task.user)
                              ?.username
                          }
                          columnId={column._id}
                          onDelete={handleDeleteTask}
                          onEdit={handleEditClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className={styles.addButton}>
          <Button
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
            disabled={tasks.length >= wipLimit}
            style={{
              backgroundColor: tasks.length >= wipLimit ? "#ddd" : undefined,
            }}
          >
            Add Task
          </Button>
        </div>
      </div>

      <TaskModal
        openModal={isModalOpen}
        closeModal={handleCloseModal}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        columnId={column._id}
        taskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        createTask={handleCreateTask}
        updateTask={handleUpdateTask}
        users={users}
        selectedUserId={selectedUserId}
        onSelectUser={handleUserChange}
      />
    </>
  );
}

export default Column;
