import { Expense } from "../../../models/expense";

export interface IGetExpensesRepository {
  getExpenses(): Promise<Expense[]>;
};