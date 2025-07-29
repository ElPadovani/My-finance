import { Expense } from "../../models/expense";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetExpensesRepository } from "./protocols";

export class GetExpensesController implements IController {
  constructor(private readonly getExpensesRepository: IGetExpensesRepository) {}

  async handle(): Promise<HttpResponse<Expense[] | string>> {
    try {
      const expenses = await this.getExpensesRepository.getExpenses();

      return ok<Expense[]>(expenses);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
};