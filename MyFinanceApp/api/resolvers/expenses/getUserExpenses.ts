import { api } from "@/api";
import { Expense, Response } from "@/api/types";

export type GetUserExpensesParams = {
  userId: string;
  title?: string
  category?: string;
  expense_date?: Date;
  start_date?: string;
  end_date?: string;
};

const getUserExpenses = async (params: GetUserExpensesParams, token: string): Promise<Response<Expense[]>> => {
  try {
    const { data } = await api.post<Expense[]>(
      `/expenses/${params.userId}`,
      (({ userId, ...rest }) => rest)(params),
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(data);

    return { data };
  } catch (error: any) {
    console.error(`Erro de status ${error.status}: ${error.mensagem}`);

    return { error: error.mensagem || "Erro inesperado" };
  }
}

export default getUserExpenses;