import { api } from "@/api";
import { Expense, Response } from "@/api/types";

const getUserExpenses = async (expenseId: string): Promise<Response<Expense>> => {
  try {
    const { data } = await api.delete<Expense>(`/expenses/${expenseId}`);

    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
}

export default getUserExpenses;