import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "@models";

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      response.status(403).json({ message: "Invalid email address" });
      return;
    }

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) {
      response.status(403).json({ message: "Invalid password" });
      return;
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: 3600 * 24,
    });

    response.status(200).json({
      message: "Login successful",
      data: {
        user: payload,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Failed to login" });
    console.log(error);
  }
};
