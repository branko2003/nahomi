import axios from "./axios";
import Cookies from "js-cookie"

const obtenerToken = () => { const token = Cookies.get(); return token.token;}; 
const token = obtenerToken();
const configInicial = { headers: { Authorization: `Bearer ${token}` }};

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
