import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id:string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.
      collection("users").
      updateOne({
        _id: new ObjectId(id) 
      }, {
        $set: {
          ...params
        }
      });

    const updatedUser = await MongoClient.db.
      collection<Omit<User, "id">>("users").
      findOne({ _id: new ObjectId(id) });

    if (!updatedUser) {
      throw new Error("User not updated.");
    }

    const { _id, ...rest } = updatedUser;

    return { id: _id.toHexString(), ...rest };
  };
};