import { Router } from "express";
import { MongoCreateExpenseRepository } from "../repositories/create-expense/mongo-create-expense";
import { CreateExpenseController } from "../controllers/create-expense/create-expense";

const router = Router();

router.post("/expenses", async (req, res) => {
  const mongoCreateExpenseRepository = new MongoCreateExpenseRepository();

  const createExpenseController = new CreateExpenseController(mongoCreateExpenseRepository);

  const { body, statusCode } = await createExpenseController.handle({body: req.body});

  res.status(statusCode).send(body);
});

export default router;