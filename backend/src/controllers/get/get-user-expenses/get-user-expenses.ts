import { Expense } from "../../../models/expense";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetUserExpenseParams, IGetUserExpenseRepository } from "./protocols";

export class GetUserExpensesController implements IController {
  constructor(private readonly getUserExpenseRepository: IGetUserExpenseRepository) {}
  
  async handle(httpRequest: HttpRequest<GetUserExpenseParams | undefined>): Promise<HttpResponse<Expense[] | string>> {
    try {
      const userId = httpRequest?.params?.userId;
      const body = httpRequest?.body;

      if (!userId) {
        return badRequest("Missing expense id.");
      }

      if (body) {
        const allowedFieldsToUpdate: (keyof GetUserExpenseParams)[] = ["category", "description", "expense_date", "start_date", "end_date"];
        
        const someFieldIsNotAllowedToUpdate = Object.keys(body).
          some(key => !allowedFieldsToUpdate.includes(key as keyof GetUserExpenseParams));
  
        if (someFieldIsNotAllowedToUpdate) {
          return badRequest("Some received field is not allowed.");
        }
      }

      const expenses = await this.getUserExpenseRepository.getUserExpense(userId, body);

      return ok<Expense[]>(expenses);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
}