import { Expense } from "../models/expense";
import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;

export type MongoExpense = Omit<Expense, "id">;