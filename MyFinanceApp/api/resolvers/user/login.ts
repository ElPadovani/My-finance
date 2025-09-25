import { api } from "@/api";
import { User, Response } from "@/api/types";

export type Login = {
  token: string;
  user: User;
};

const login = async (email: string, password: string): Promise<Response<Login>> => {
  try {
    const { data } = await api.post<Login>("/login", { email, password });
  
    console.log(data)

    return { data };
  } catch (error: any) {
    return {
      error: error?.response?.data?.message || "Erro ao fazer o login"
    }
  }
};

export default login;