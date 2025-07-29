import { ObjectId } from "mongodb";
import { IUpdateExpenseRepository, UpdateExpenseParams } from "../../../controllers/update/update-expense/protocols";
import { MongoClient } from "../../../database/mongo";
import { Expense } from "../../../models/expense";
import { MongoExpense } from "../../mongo-protocols";

export class MongoUpdateExpenseRepository implements IUpdateExpenseRepository {
  async updateExpense(id: string, params: UpdateExpenseParams): Promise<Expense> {
    await MongoClient.db.
      collection("expenses").
      updateOne({
        _id: new ObjectId(id) 
      }, {
        $set: {
          ...params
        }
      });

    const updatedUser = await MongoClient.db.
      collection<MongoExpense>("expenses").
      findOne({ _id: new ObjectId(id) });

    if (!updatedUser) {
      throw new Error("Expense not updated.");
    }

    const { _id, ...rest } = updatedUser;

    return { id: _id.toHexString(), ...rest };
  }
}