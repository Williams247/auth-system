import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { UserTypeEnum } from "@utils";

export const Auth =
  ({ userType }: { userType: UserTypeEnum }) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let token = request.headers["authorization"];
      if (!token) {
        response.status(401).json({ message: "Unauthorized" });
        return;
      }

      if (!token.startsWith("Bearer ")) {
        response
          .status(401)
          .json({ message: "Token must have a bearer prefix" });
        return;
      }

      token = token.slice(7, token.length);
      const authorized: any = await JWT.verify(
        token,
        process.env.SECRET as string
      );

      if (authorized.role !== userType) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      request.user = authorized;
      next();
    } catch (error) {
      response.status(500).json({ message: error });
      console.log(error);
    }
  };
