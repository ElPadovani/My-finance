import axios from "axios";
import Constants from "expo-constants";

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl ?? "https://my-finance-backend.onrender.com",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // pega direto a mensagem do backend, se existir
      let mensagem;
      if (typeof error.response.data === "string") {
        mensagem = error.response.data;
      } else if (error.response.data?.message) {
        mensagem = error.response.data.message;
      } else if (error.response.data?.error) {
        mensagem = error.response.data.error;
      } else {
        mensagem = "Erro inesperado";
      }

      return Promise.reject({ status, mensagem });
    }

    return Promise.reject({ mensagem: "Erro de rede" });
  }
);