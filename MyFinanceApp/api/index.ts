import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-finance-backend.onrender.com", 
  timeout: 10000,
});