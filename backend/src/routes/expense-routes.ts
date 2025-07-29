import { Router } from "express";
import { MongoCreateExpenseRepository } from "../repositories/create-expense/mongo-create-expense";
import { CreateExpenseController } from "../controllers/create-expense/create-expense";
import { GetExpensesController } from "../controllers/get-expenses/get-expenses";
import { MongoGetExpensesRepository } from "../repositories/get-expenses/mongo-get-expenses";

const router = Router();

router.get("/users", async (req, res) => {
  const mongoGetExpensesRepository = new MongoGetExpensesRepository();

  const getExpensesController = new GetExpensesController(mongoGetExpensesRepository);
  
  const { body, statusCode } = await getExpensesController.handle();
  
  res.status(statusCode).send(body);
});

router.post("/expenses", async (req, res) => {
  const mongoCreateExpenseRepository = new MongoCreateExpenseRepository();

  const createExpenseController = new CreateExpenseController(mongoCreateExpenseRepository);

  const { body, statusCode } = await createExpenseController.handle({body: req.body});

  res.status(statusCode).send(body);
});

export default router;