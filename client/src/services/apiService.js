import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for attaching tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//for handling redirection to login page if token is expired
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

//Login & Signup API calls

export const signUp = async (userData) => {
  return api.post("/signup", userData);
};

export const logIn = async (userData) => {
  return api.post("/login", userData);
};

// Board API calls
export const initializeBoard = async () => {
  try {
    const response = await api.get("/boards");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const newBoardResponse = await createBoard("New Board");
      return newBoardResponse.data;
    } else {
      console.error("Error fetching board details:", error);
      throw error;
    }
  }
};

export const createBoard = async (boardName) => {
  try {
    const response = api.post("/boards", { name: boardName });
    return response;
  } catch (error) {
    console.error("Error creating new board:", error);
    throw error;
  }
};

export const updateBoardName = async (boardId, boardName) => {
  return api.patch(`/boards/${boardId}`, { name: boardName });
};

//Column API calls
export const fetchColumns = async () => {
  try {
    const response = await api.get("/columns");
    return response.data;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

export const createColumn = async (newColumn) => {
  return api.post("/columns", newColumn);
};

export const deleteColumn = async (columnId) => {
  return api.delete(`/columns/${columnId}`);
};

export const updateColumn = async (columnId, updatedData) => {
  return api.patch(`/columns/${columnId}`, updatedData);
};

export const updateColumnName = async (columnId, name) => {
  return api.patch(`/columns/${columnId}`, { name });
};

export const updateColumnWipLimit = async (columnId, wip) => {
  return api.patch(`/columns/${columnId}`, { wip });
};

// Task API calls
export const fetchTasks = async () => {
  return api.get(`/tasks`);
};

export const createTask = async (newTask) => {
  return api.post("/tasks", newTask);
};

export const updateTask = async (taskId, taskData) => {
  return api.patch(`/tasks/${taskId}`, taskData);
};

export const deleteTask = async (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};

// User API calls
// fetch users

// Interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors here, e.g. logging or showing notifications
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
