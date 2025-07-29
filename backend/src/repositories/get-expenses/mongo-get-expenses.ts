import { IGetExpensesRepository } from "../../controllers/get-expenses/protocols";
import { MongoClient } from "../../database/mongo";
import { Expense } from "../../models/expense";
import { MongoExpense } from "../mongo-protocols";

export class MongoGetExpensesRepository implements IGetExpensesRepository {
  async getExpenses(): Promise<Expense[]> {
    const expenses = await MongoClient.db.
      collection<MongoExpense>("expenses").
      find({}).
      toArray();

    return expenses.map(({ _id, ...rest }) => ({ id: _id.toHexString(), ...rest }));
  }
}