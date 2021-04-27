import { Router, Request, Response } from 'express';
import CreditCardController from '../controllers/CreditCardController';

const creditCardRouter = Router();

creditCardRouter.get("/", CreditCardController.getAll);
creditCardRouter.get("/:IdProducto", CreditCardController.get);
creditCardRouter.post("/Create", CreditCardController.create);
creditCardRouter.put("/Update",CreditCardController.update);
creditCardRouter.delete("/Delete",CreditCardController.delete);
export default creditCardRouter;