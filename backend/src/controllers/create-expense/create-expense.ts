import { Expense } from "../../models/expense";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateExpenseParams, ICreateExpenseRepository } from "./protocols";

export class CreateExpenseController implements IController {
  constructor(private readonly createExpenseRepository: ICreateExpenseRepository) {}

  async handle(httpRequest: HttpRequest<CreateExpenseParams>): Promise<HttpResponse<Expense | string>> {
    try {
      // verificar campos obrigatórios
      const requiredFields = ["user_id", "description", "value", "category", "expense_date"];

      for (const field of requiredFields) {
        if (!(!!httpRequest?.body?.[field as keyof CreateExpenseParams])) {
          return badRequest(`Field "${field}" is required.`);
        }
      }

      const expense = await this.createExpenseRepository.createExpense(httpRequest.body!);

      return created<Expense>(expense);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
}