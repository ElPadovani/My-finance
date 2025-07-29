import { Expense } from "../../models/expense";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteExpenseRepository } from "./protocols";

export class DeleteExpenseController implements IController {
  constructor(private readonly deleteExpenseRepository: IDeleteExpenseRepository) {}

  async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Expense | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id.");
      }

      const expense = await this.deleteExpenseRepository.deleteUser(id);

      return ok<Expense>(expense);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
};