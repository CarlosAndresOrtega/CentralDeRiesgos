import { Router, Request, Response } from 'express';
import CreditsController from '../controllers/CreditsController';

const creditsRouter = Router();

creditsRouter.get("/", CreditsController.getAll);
creditsRouter.get("/:IdProducto", CreditsController.get);
creditsRouter.post("/Create", CreditsController.create);
creditsRouter.put("/Update", CreditsController.update);
creditsRouter.delete("/Delete", CreditsController.delete);

export default creditsRouter;