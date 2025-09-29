import { api } from "@/api";
import { AppUser, Response } from "@/api/types";

export type Login = {
  token: string;
  user: AppUser;
};

const login = async (email: string, password: string): Promise<Response<Login>> => {
  try {
    const { data } = await api.post<Login>("/login", { email, password });
  
    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
};

export default login;