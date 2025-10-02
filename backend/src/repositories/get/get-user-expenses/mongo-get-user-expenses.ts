import { GetUserExpenseParams, IGetUserExpenseRepository } from "../../../controllers/get/get-user-expenses/protocols";
import { MongoClient } from "../../../database/mongo";
import { Expense } from "../../../models/expense";
import { MongoExpense } from "../../mongo-protocols";

export class MongoGetUserExpenseRepository implements IGetUserExpenseRepository {
  async getUserExpense(userId: string, expenseParams: GetUserExpenseParams): Promise<Expense[]> {
    const query: any = {
      user_id: userId,
    };

    if (expenseParams?.title) {
      query.title = { $regex: expenseParams.title, $options: "i" };
    }

    if (expenseParams?.category) {
      query.category = expenseParams.category;
    }

    if (expenseParams?.expense_date) {
      const start = new Date(expenseParams.expense_date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(expenseParams.expense_date);
      end.setHours(23, 59, 59, 999);

      query.expense_date = { $gte: start, $lte: end };
    }

    if(expenseParams?.start_date && expenseParams?.end_date) {
      const start = new Date(expenseParams.start_date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(expenseParams.end_date);
      end.setHours(23, 59, 59, 999);

      query.expense_date = { $gte: start, $lte: end };
    }

    const expenses = await MongoClient.db
      .collection<MongoExpense>("expenses")
      .find(query)
      .toArray();

    return expenses.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }));
  }
}