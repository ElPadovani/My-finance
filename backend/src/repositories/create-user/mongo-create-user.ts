
import { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db.
      collection("users").
      insertOne(params);

    const createdUser = await MongoClient.db.
      collection("users").
      findOne({ _id: insertedId });

    if (!createdUser) {
      throw new Error("User not created");
    }

    const {_id, ...rest} = createdUser;

    return { id: _id.toHexString(), ...rest as Omit<User, "id">};
  }
}