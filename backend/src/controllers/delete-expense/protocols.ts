import { Expense } from "../../models/expense";

export interface IDeleteExpenseRepository {
  deleteExpense(id: string): Promise<Expense>;
};