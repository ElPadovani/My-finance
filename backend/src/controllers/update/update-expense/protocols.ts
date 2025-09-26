import { Expense } from "../../../models/expense";

export interface UpdateExpenseParams {
  description?: string;
  value?: number;
  category?: string;
};

export interface IUpdateExpenseRepository {
  updateExpense(id: string, params: UpdateExpenseParams): Promise<Expense>;
};
