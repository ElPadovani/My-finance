import { Expense } from "../../../models/expense";

export interface GetUserExpenseParams {
  title?: string;
  category?: string;
  expense_date?: Date;
  start_date?: string;
  end_date?: string;
}

export interface IGetUserExpenseRepository {
  getUserExpense(userId: string, expenseParams?: GetUserExpenseParams): Promise<Expense[]>;
};