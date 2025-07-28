import { User } from "../../models/user";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  creation_date: Date;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}