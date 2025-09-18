import { IUserRepository } from "../controllers/protocols";
import { MongoClient } from "../database/mongo";
import { User } from "../models/user";
import { MongoUser } from "./mongo-protocols";

export class MongoUserRepository implements  IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await MongoClient.db.
      collection<MongoUser>('users').
      findOne({ email });

      if (!user) {
        throw new Error("User not found by email.");
      }
  
    const { _id, ...rest } = user;

    return { id: _id.toHexString() , ...rest };
  };
};