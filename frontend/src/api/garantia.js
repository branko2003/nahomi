import axios from "./axios";

export const getGarantiasRequest = async () => axios.get("/garantia");

export const createGarantiaRequest = async (garantia) => axios.post("/garantia", garantia);

export const updateGarantiaRequest = async (id, garantia) => axios.put(`/garantia/${id}`, garantia);

export const deleteGarantiaRequest = async (id) => axios.delete(`/garantia/${id}`);

export const getGarantiaRequest = async (id) => axios.get(`/garantia/${id}`);
