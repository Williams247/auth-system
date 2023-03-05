import { Request, Response } from "express";
import { UserModel } from "@models";

export const Profile = async (request: Request, response: Response) => {
  try {
    const userId = request.user.id;
    const user = await UserModel.findById(userId).select("-password");
    response.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    response.status(500).json({ message: "Failed to get user profile" });
    console.log(error);
  }
};
