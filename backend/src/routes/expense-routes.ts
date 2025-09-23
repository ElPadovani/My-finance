import { Router } from "express";
import { MongoCreateExpenseRepository } from "../repositories/create/create-expense/mongo-create-expense";
import { CreateExpenseController } from "../controllers/create/create-expense/create-expense";
import { MongoGetExpensesRepository } from "../repositories/get/get-expenses/mongo-get-expenses";
import { GetExpensesController } from "../controllers/get/get-expenses/get-expenses";
import { MongoUpdateExpenseRepository } from "../repositories/update/update-expense/mongo-update-expense";
import { UpdateExpenseController } from "../controllers/update/update-expense/update-expense";
import { MongoDeleteExpenseRepository } from "../repositories/delete/delete-expenses/mongo-delete-expenses";
import { DeleteExpenseController } from "../controllers/delete/delete-expense/delete-expense";
import { MongoGetUserExpenseRepository } from "../repositories/get/get-user-expenses/mongo-get-user-expenses";
import { GetUserExpensesController } from "../controllers/get/get-user-expenses/get-user-expenses";

import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();

router.get("/expenses/all", async (req, res) => {
  const mongoGetExpensesRepository = new MongoGetExpensesRepository();

  const getExpensesController = new GetExpensesController(mongoGetExpensesRepository);
  
  const { body, statusCode } = await getExpensesController.handle();
  
  res.status(statusCode).send(body);
});

router.get("/expenses/:userId", authMiddleware, async (req, res) => {
  const mongoGetUserExpensesRepository = new MongoGetUserExpenseRepository();

  const getUserExpensesController = new GetUserExpensesController(mongoGetUserExpensesRepository);

  const { body, statusCode } = await getUserExpensesController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

router.post("/expenses", authMiddleware, async (req, res) => {
  const mongoCreateExpenseRepository = new MongoCreateExpenseRepository();

  const createExpenseController = new CreateExpenseController(mongoCreateExpenseRepository);

  const { body, statusCode } = await createExpenseController.handle({ body: req.body });

  res.status(statusCode).send(body);
});

router.patch("/expenses/:id", authMiddleware, async (req, res) => {
  const mongoUpdateExpenseRepository = new MongoUpdateExpenseRepository();

  const updateExpenseController = new UpdateExpenseController(mongoUpdateExpenseRepository);

  const { body, statusCode } = await updateExpenseController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

router.delete("/expenses/:id", authMiddleware, async (req, res) => {
  const mongoDeleteExpenseRepository = new MongoDeleteExpenseRepository();

  const deleteExpenseController = new DeleteExpenseController(mongoDeleteExpenseRepository);

  const { body, statusCode } = await deleteExpenseController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

export default router;