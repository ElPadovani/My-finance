import { Router } from "express";
import { MongoCreateExpenseRepository } from "../repositories/create-expense/mongo-create-expense";
import { CreateExpenseController } from "../controllers/create-expense/create-expense";
import { MongoGetExpensesRepository } from "../repositories/get-expenses/mongo-get-expenses";
import { GetExpensesController } from "../controllers/get-expenses/get-expenses";
import { MongoUpdateExpenseRepository } from "../repositories/update-expense/mongo-update-expense";
import { UpdateExpenseController } from "../controllers/update-expense/update-expense";
import { MongoDeleteExpenseRepository } from "../repositories/delete-expenses/mongo-delete-expenses";
import { DeleteExpenseController } from "../controllers/delete-expense/delete-expense";

const router = Router();

router.get("/expenses", async (req, res) => {
  const mongoGetExpensesRepository = new MongoGetExpensesRepository();

  const getExpensesController = new GetExpensesController(mongoGetExpensesRepository);
  
  const { body, statusCode } = await getExpensesController.handle();
  
  res.status(statusCode).send(body);
});

router.post("/expenses", async (req, res) => {
  const mongoCreateExpenseRepository = new MongoCreateExpenseRepository();

  const createExpenseController = new CreateExpenseController(mongoCreateExpenseRepository);

  const { body, statusCode } = await createExpenseController.handle({ body: req.body });

  res.status(statusCode).send(body);
});

router.patch("/expenses/:id", async (req, res) => {
  const mongoUpdateExpenseRepository = new MongoUpdateExpenseRepository();

  const updateExpenseController = new UpdateExpenseController(mongoUpdateExpenseRepository);

  const { body, statusCode } = await updateExpenseController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

router.delete("/expenses/:id", async (req, res) => {
  const mongoDeleteExpenseRepository = new MongoDeleteExpenseRepository();

  const deleteExpenseController = new DeleteExpenseController(mongoDeleteExpenseRepository);

  const { body, statusCode } = await deleteExpenseController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

export default router;