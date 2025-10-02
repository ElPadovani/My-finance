// mongo-get-user-expenses.ts

import { GetUserExpenseParams, IGetUserExpenseRepository } from "../../../controllers/get/get-user-expenses/protocols";
import { MongoClient } from "../../../database/mongo";
import { Expense } from "../../../models/expense";
import { MongoExpense } from "../../mongo-protocols";

// 🔹 Helpers de data (São Paulo). Brasil está UTC-3.
// Se quiser 100% acerto histórico de fuso/dst, troque por date-fns-tz.
const TZ = "-03:00";
const pickYMD = (s: string) => (s.includes("T") ? s.slice(0, 10) : s); // "YYYY-MM-DD"
const atStartOfDaySP = (ymd: string) => new Date(`${ymd}T00:00:00.000${TZ}`);
const atEndOfDaySP   = (ymd: string) => new Date(`${ymd}T23:59:59.999${TZ}`);

// (opcional) sanitizar strings vazias
const nonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

export class MongoGetUserExpenseRepository implements IGetUserExpenseRepository {
  async getUserExpense(userId: string, expenseParams: GetUserExpenseParams): Promise<Expense[]> {
    const query: any = { user_id: userId };

    // 🔎 título (mantido)
    if (expenseParams?.title) {
      query.title = { $regex: expenseParams.title, $options: "i" };
    }

    // 🗓️ REGRA DE DATA:
    // - OU "expense_date" (data única) -> pega o dia inteiro
    // - OU "start_date"/"end_date" (intervalo) -> pega dias inteiros entre eles
    const rawExpenseDate = expenseParams?.expense_date;
    const rawStart = expenseParams?.start_date;
    const rawEnd = expenseParams?.end_date;

    if (nonEmpty(rawExpenseDate)) {
      // Data única (aceita "YYYY-MM-DD" ou ISO). Sempre converte pro dia inteiro em SP.
      const ymd = pickYMD(rawExpenseDate);
      const gte = atStartOfDaySP(ymd);
      const lt  = new Date(atEndOfDaySP(ymd).getTime() + 1); // usa $lt próx. ms
      query.expense_date = { $gte: gte, $lt: lt };
    } else if (nonEmpty(rawStart) || nonEmpty(rawEnd)) {
      // Intervalo. Se vier só um lado, completa o outro com infinito “plausível”.
      const startYMD = nonEmpty(rawStart) ? pickYMD(rawStart) : undefined;
      const endYMD   = nonEmpty(rawEnd)   ? pickYMD(rawEnd)   : undefined;

      if (startYMD && endYMD) {
        const gte = atStartOfDaySP(startYMD);
        const lt  = new Date(atEndOfDaySP(endYMD).getTime() + 1);
        query.expense_date = { $gte: gte, $lt: lt };
      } else if (startYMD) {
        const gte = atStartOfDaySP(startYMD);
        query.expense_date = { $gte: gte };
      } else if (endYMD) {
        const lt = new Date(atEndOfDaySP(endYMD).getTime() + 1);
        query.expense_date = { $lt: lt };
      }
    }

    const expenses = await MongoClient.db
      .collection<MongoExpense>("expenses")
      .find(query)
      .sort({ expense_date: -1 }) // opcional: ordena mais novos primeiro
      .toArray();

    return expenses.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }));
  }
}