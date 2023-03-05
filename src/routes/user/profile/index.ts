import express from "express";
import { Auth } from "@middlewares";
import { Profile } from "@controllers";
import { UserTypeEnum } from "@utils";

const router = express.Router();

router.get("/user", Auth({ userType: UserTypeEnum.User }), Profile);

export const profileRoutes = { router };
