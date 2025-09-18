import { Expense } from "../../../models/expense";

export interface GetUserExpenseParams {
  description?: string;
  category?: string;
  expense_date?: Date;
}

export interface IGetUserExpenseRepository {
  getUserExpense(userId: string, expenseParams?: GetUserExpenseParams): Promise<Expense[]>;
};