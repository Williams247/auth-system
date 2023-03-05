import "module-alias/register";
import express, { Request, Response, Application, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import appRouter from "@routes";
import { User } from "@utils";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(morgan("dev"));

app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type"
  );
  next();
});

app.use(appRouter);

app.use((request: Request, response: Response) => {
  response.status(404).json({ message: "Route not found" });
});

const port = 8000;

app.listen(port, async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.LOCAL_URI as string);
    console.log("Connection established");
  } catch (error) {
    console.log(error);
  }
});
