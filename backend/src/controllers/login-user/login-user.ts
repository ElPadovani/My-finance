import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoUserRepository, UserNotFoundError } from "../../repositories/mongo-user-repository";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { LoginUserParams, LoginUserResult } from "./protocols";

const JWT_SECRET = process.env.JWT_SECRET || "enzo-123";

export class LoginUserController implements IController {
  constructor(private readonly userRepository: MongoUserRepository) {}

  async handle(httpRequest: HttpRequest<LoginUserParams>): Promise<HttpResponse<LoginUserResult | string>> {
    try {
      // verificar campos obrigatórios
      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof LoginUserParams]?.length) {
          return badRequest(`Field "${field}" is required.`);
        }
      }

      // veirificar email válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("email is invalid.");
      }

      const user = await this.userRepository.findByEmail(httpRequest.body!.email);

      if (!user) {
        return badRequest("invalid credentials.")
      }

      const validPassword = await bcrypt.compare(httpRequest.body!.password, user.password);

      if (!validPassword) {
        return badRequest("invalid credentials.")
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1d"
      });

      return ok<LoginUserResult>({ token });
    } catch (error) {
      console.error(error);

      if (error instanceof UserNotFoundError) {
        return badRequest("invalid credentials.");
      }

      return serverError();
    };
  };
};