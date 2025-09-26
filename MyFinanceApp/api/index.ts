import axios from "axios";
import Constants from "expo-constants";

export const api = axios.create({
  // baseURL: "https://my-finance-backend.onrender.com", 
  baseURL: Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:8000",
  timeout: 10000,
});