import { CreateExpenseParams, ICreateExpenseRepository } from "../../controllers/create-expense/protocols";
import { MongoClient } from "../../database/mongo";
import { Expense } from "../../models/expense";
import { MongoExpense } from "../mongo-protocols";

export class MongoCreateExpenseRepository implements ICreateExpenseRepository {
  async createExpense(params: CreateExpenseParams): Promise<Expense> {
    const expenseParams: MongoExpense = { ...params, expense_date: new Date(params.expense_date) ,creation_date: new Date() };

    const { insertedId } = await MongoClient.db.
      collection("expenses").
      insertOne(expenseParams);

    const createdExpense = await MongoClient.db.
      collection<MongoExpense>("expenses").
      findOne({ _id: insertedId });

    if (!createdExpense) {
      throw new Error("Expense not created.");
    }

    const { _id, ...rest } = createdExpense;

    return { id: _id.toHexString(), ...rest };
  }
}