import { api } from "@/api";
import { User, Response } from "@/api/types";

export type CreateExpenseParams = {
  user_id: string;
  description: string;
  value: number;
  category: string;
  expense_date: string;
};

const createUser = async (expenseParams: CreateExpenseParams): Promise<Response<User>> => {
  try {
    const { data } = await api.post<User>("/expenses", expenseParams);
  
    console.log(data);

    return { data };
  } catch (error: any) {
    return {
      error: error.response?.data || "Erro ao criar gasto."
    }
  }
};

export default createUser;