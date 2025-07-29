import { ok } from "../../helpers";
import { Expense } from "../../../models/expense";
import { badRequest, serverError } from "../../helpers";
import { IController, HttpRequest, HttpResponse } from "../../protocols";
import { IDeleteExpenseRepository } from "./protocols";

export class DeleteExpenseController implements IController {
  constructor(private readonly deleteExpenseRepository: IDeleteExpenseRepository) {}

  async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Expense | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing expense id.");
      }

      const expense = await this.deleteExpenseRepository.deleteExpense(id);

      return ok<Expense>(expense);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
};