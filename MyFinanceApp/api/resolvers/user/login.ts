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
    return {
      error: error.response?.data || "Erro ao fazer login."
    }
  }
};

export default login;