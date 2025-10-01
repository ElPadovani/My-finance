import { api } from "@/api";
import { Response, Expense } from "@/api/types";

export type CreateExpenseParams = {
  user_id: string;
  title: string;
  description: string;
  value: number;
  category: string;
  expense_date: string;
};

const createExpense = async (expenseParams: CreateExpenseParams, token: string): Promise<Response<Expense>> => {
  try {
    const { data } = await api.post<Expense>("/expenses", expenseParams);
  
    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
};

export default createExpense;