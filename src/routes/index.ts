import express, { Application } from "express";
import { authRoutes, profileRoutes } from "./user";

const appRouter: Application = express();

appRouter.use("/auth", authRoutes.router);
appRouter.use("/profile", profileRoutes.router);

export default appRouter;
