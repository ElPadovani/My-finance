import { Expense } from "../../models/expense";

export interface IDeleteExpenseRepository {
  deleteUser(id: string): Promise<Expense>;
};