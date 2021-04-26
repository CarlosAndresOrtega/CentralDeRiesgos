import { Router, Request, Response } from 'express';
import LoansController from '../controllers/LoansController';

const loansRouter = Router();

loansRouter.get("/", LoansController.getAll);
loansRouter.post("/", LoansController.create);

export default loansRouter;
