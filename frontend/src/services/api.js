// /frontend/src/services/api.js [ centralized API service built with Axios ]
//
// Axios is a JavaScript library for making HTTP requests from:
//  the browser (frontend, e.g., React) or Node.js (backend, e.g., Express scripts)
// It’s essentially a tool for talking to APIs (sending and receiving data).
// use Axios instead of fetch for: Cleaner syntax, No need to parse json, error handling, node.js support
// ensure you install npm install axios

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add response interceptor for error handling,
// This saves you from repeating try/catch boilerplate in every call.
// API helper functions (employeeAPI, departmentAPI) - this is so that React components don't need to write raw HTTP calls everywhere
// API client
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.code === "ECONNREFUSED") {
      alert(
        "Backend server is not running! Please start the backend on port 5000."
      );
    }
    return Promise.reject(error);
  }
);

// Encapsulates employee-related endpoints.
export const employeeAPI = {
  getAll: (params = {}) => api.get("/employees", { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post("/employees", data),
  update: (id, data) => api.put(`/employees/${id}`, data), // This uses employeeId, not _id
  delete: (id) => api.delete(`/employees/${id}`),
};

// Encapsulates department-related endpoints.
export const departmentAPI = {
  getAll: () => api.get("/departments"),
  create: (data) => api.post("/departments", data),
  update: (id, data) => api.put(`/departments/${id}`, data), // uses departmentId
  delete: (id) => api.delete(`/departments/${id}`), // uses departmentId
};

export default api;
