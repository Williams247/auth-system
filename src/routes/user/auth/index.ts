import express from "express";
import { validateRegister, validateLogin } from "@middlewares";
import { register, login } from "@controllers";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export const authRoutes = { router };
