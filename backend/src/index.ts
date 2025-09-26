import express from 'express';
import cors from "cors";
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';
import userRoutes from "./routes/user-routes";
import expenseRoutes from "./routes/expense-routes";

const main = async () => {
  config();
  
  const app = express();

  app.use(express.json());
  app.use(cors());

  await MongoClient.connect();

  app.use(userRoutes);
  app.use(expenseRoutes);

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port: ${port}!`));
};

main();