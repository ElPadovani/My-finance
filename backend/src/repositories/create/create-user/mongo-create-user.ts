
import { CreateUserParams, ICreateUserRepository } from "../../../controllers/create/create-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const userParams: MongoUser = { ...params, creation_date: new Date() }

    const { insertedId } = await MongoClient.db.
      collection("users").
      insertOne(userParams);

    const createdUser = await MongoClient.db.
      collection<MongoUser>("users").
      findOne({ _id: insertedId });

    if (!createdUser) {
      throw new Error("User not created");
    }

    const {_id, ...rest} = createdUser;

    return { id: _id.toHexString(), ...rest };
  }
}