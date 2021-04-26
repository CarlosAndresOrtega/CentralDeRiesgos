import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.get("/:TypeDocument/:NDocument/", UsersController.get);

usersRouter.post("/", UsersController.create);

export default usersRouter;
