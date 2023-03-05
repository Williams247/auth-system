import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Domains, UserTypeEnum } from "@utils";

export const validateRegister = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .label("Email"),
    password: Joi.string().required().label("Password"),
    role: Joi.string().valid(UserTypeEnum.Admin, UserTypeEnum.User).required(),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(422).json({ message: error.message });
    return;
  }

  next();
};

export const validateLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(422).json({ message: error.message });
    return;
  }

  next();
};
