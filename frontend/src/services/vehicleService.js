import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicles";

export const getVehicles = () => {
  return axios.get(API_URL);
};