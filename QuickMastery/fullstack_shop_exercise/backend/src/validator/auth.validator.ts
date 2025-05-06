import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      password: Joi.required(),
      username: Joi.string().required(),
      rememberMe: Joi.boolean(),
    });
    const validateError = schema.validate(req.body).error;
    if (validateError) {
      res.json({
        status: "Validation Error",
        message: validateError.message,
      });
      return;
    }
    next();
  } catch (error: any) {
    console.error("Validation Error: ", error);
  }
};

export const registerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      password: Joi.required(),
      username: Joi.string().required(),
      fullname: Joi.string().required(),
      phone_number: Joi.string().required(),
      role: Joi.string()
        .valid("admin", "cashier")
        .default("cashier"),
    });
    const validateError = schema.validate(req.body).error;
    if (validateError) {
      res.json({
        status: "Validation Error",
        message: validateError.message,
      });
      return;
    }
    next();
  } catch (error: any) {
    console.error("Validation Error: ", error);
  }
};
