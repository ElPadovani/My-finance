import { Expense } from "../../../models/expense";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateExpenseRepository, UpdateExpenseParams } from "./protocols";

export class UpdateExpenseController implements IController {
  constructor(private readonly updateExpenseRepository: IUpdateExpenseRepository) {}

  async handle(httpRequest: HttpRequest<UpdateExpenseParams>): Promise<HttpResponse<Expense | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing expense id.");
      }

      const allowedFieldsToUpdate: (keyof UpdateExpenseParams)[] = ["title", "category", "description", "value"];
      
      const someFieldIsNotAllowedToUpdate = Object.keys(body).
        some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateExpenseParams));

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed.");
      }

      const expense = await this.updateExpenseRepository.updateExpense(id, body);

      return ok<Expense>(expense);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
};