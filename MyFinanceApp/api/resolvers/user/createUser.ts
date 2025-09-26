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
    return {
      error: error.response?.data || "Erro ao criar usuário."
    }
  }
};

export default createUser;