import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {

    return [{
      name: "Enzo",
      email: "enzo@email.com",
      password: "enzo123",
      creation_date: new Date()
    }];
  }
}