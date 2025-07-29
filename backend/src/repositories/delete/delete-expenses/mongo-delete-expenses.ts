import { ObjectId } from "mongodb";
import { IDeleteExpenseRepository } from "../../../controllers/delete/delete-expense/protocols";
import { MongoClient } from "../../../database/mongo";
import { Expense } from "../../../models/expense";
import { MongoExpense } from "../../mongo-protocols";

export class MongoDeleteExpenseRepository implements IDeleteExpenseRepository {
  async deleteExpense(id: string): Promise<Expense> {
    const mongoId = new ObjectId(id);

    const expense = await MongoClient.db.
      collection<MongoExpense>("expenses").
      findOne({ _id: mongoId });

    if (!expense) {
      throw new Error("Expense not found.");
    }

    const { deletedCount } = await MongoClient.db.
      collection<MongoExpense>("expenses").
      deleteOne({ _id: mongoId});

    if (!deletedCount) {
      throw new Error("Expense not deleted.");
    }

    const { _id, ...rest } = expense;

    return { id: _id.toHexString(), ...rest };
  }
};