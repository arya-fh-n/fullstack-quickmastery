import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "src/types/response.types";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    const error: BaseResponse = {
      status: "Auth Error",
      message: "Authentication required",
    };
    res.status(401).json(error);
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      const error: BaseResponse = {
        status: "Token Error",
        message: "Invalid or expired token",
      };

      res.status(403).json(error);
      return;
    }

    next();
  });
};
