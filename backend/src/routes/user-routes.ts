import { Router } from "express";
import { MongoGetUsersRepository } from "../repositories/get/get-users/mongo-get-users";
import { GetUsersController } from "../controllers/get/get-users/get-users";
import { MongoCreateUserRepository } from "../repositories/create/create-user/mongo-create-user";
import { CreateUserController } from "../controllers/create/create-user/create-user";
import { MongoDeleteUserRepository } from "../repositories/delete/delete-user/mongo-delete-user";
import { DeleteUserController } from "../controllers/delete/delete-user/delete-user";
import { MongoUpdateUserRepository } from "../repositories/update/update-user/mongo-update-user";
import { UpdateUserController } from "../controllers/update/update-user/update-user";
import { LoginUserController } from "../controllers/login-user/login-user";
import { MongoUserRepository } from "../repositories/mongo-user-repository";

const router = Router();

router.get("/login", async (req, res) => {
  const mongoUserRepository = new MongoUserRepository();

  const loginUserController = new LoginUserController(mongoUserRepository);

  const { body, statusCode } = await loginUserController.handle({ body: req.body });

  res.status(statusCode).send(body);
});

router.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  
  const { body, statusCode } = await getUsersController.handle();
  
  res.status(statusCode).send(body);
});

router.post("/users", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(mongoCreateUserRepository);

  const { body, statusCode } = await createUserController.handle({ body: req.body });

  res.status(statusCode).send(body);
});

router.patch("/users/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();

  const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

  const { body, statusCode } = await updateUserController.handle({ body: req.body, params: req.params });

  res.status(statusCode).send(body);
});

router.delete("/users/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();

  const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

  const { body, statusCode } = await deleteUserController.handle({ params: req.params });

  res.status(statusCode).send(body);
});

export default router;