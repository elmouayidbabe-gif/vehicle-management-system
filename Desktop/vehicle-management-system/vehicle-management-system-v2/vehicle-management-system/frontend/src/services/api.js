import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({ baseURL: API_BASE });

// AUTH
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// VEHICLES
export const getAllVehicles = () => api.get('/vehicles');
export const getAvailableVehicles = () => api.get('/vehicles/available');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const createVehicle = (data) => api.post('/vehicles', data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);
export const searchVehicles = (query) => api.get(`/vehicles/search?query=${query}`);

// PURCHASES
export const createPurchase = (data) => api.post('/purchases', data);
export const getUserPurchases = (userId) => api.get(`/purchases/user/${userId}`);
export const getAllPurchases = () => api.get('/purchases');
