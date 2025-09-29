import { api } from "@/api";
import { User, Response } from "@/api/types";

export type UpdateUserParams = {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
};

const updateUser = async (userParams: UpdateUserParams): Promise<Response<User>> => {
  try {
    const { data } = await api.patch<User>(
      `/users/${userParams.userId}`, 
      (({ userId, ...rest }) => rest)(userParams)
    );
  
    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
};

export default updateUser;