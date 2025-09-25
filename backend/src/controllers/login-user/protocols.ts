import { User } from "../../models/user";

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface LoginUserResult {
  token: string;
  user: Omit<User, "password">;
}
