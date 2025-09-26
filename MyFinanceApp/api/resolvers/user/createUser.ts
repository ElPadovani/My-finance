import { api } from "@/api";
import { User, Response } from "@/api/types";

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

const createUser = async (userParams: CreateUserParams): Promise<Response<User>> => {
  try {
    const { data } = await api.post<User>("/users", userParams);
  
    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
};

export default createUser;