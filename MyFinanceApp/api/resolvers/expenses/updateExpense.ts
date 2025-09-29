import { api } from "@/api";
import { Expense, Response } from "@/api/types";

export interface UpdateExpenseParams {
  title?: string;
  description?: string;
  value?: number;
  category?: string;
};

const updateExpense = async (expenseParams: UpdateExpenseParams): Promise<Response<Expense>> => {
  try {
    const { data } = await api.patch<Expense>("/expenses", expenseParams);
  
    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
};

export default updateExpense;