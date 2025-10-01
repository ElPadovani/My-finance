import { Expense } from "../../../models/expense";

export interface UpdateExpenseParams {
  title?: string;
  description?: string;
  value?: number;
  category?: string;
  expense_date?:string
};

export interface IUpdateExpenseRepository {
  updateExpense(id: string, params: UpdateExpenseParams): Promise<Expense>;
};
