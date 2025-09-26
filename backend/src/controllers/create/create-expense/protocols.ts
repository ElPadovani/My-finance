import { Expense } from "../../../models/expense";


export interface CreateExpenseParams {
  user_id: string;
  description: string;
  value: number;
  category: string;
  expense_date: string;
};

export interface ICreateExpenseRepository {
  createExpense(params: CreateExpenseParams): Promise<Expense>;
};
