import { Router } from "express";
import usersRouter from "./users.routes";
import creditsRouter from "./credits.router";
import loansRoutes from "./loans.routes";
import creditCardRouter from "./creditcard.router";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/loans", loansRoutes);
routes.use("/credits", creditsRouter);
routes.use("/creditcards", creditCardRouter);
export default routes;