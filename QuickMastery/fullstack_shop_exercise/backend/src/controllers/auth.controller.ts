import { Request, Response } from "express";
import AuthService from "../service/auth.service.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

dotenv.config();

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.json({
          status: "Error",
          error: "Username and password are required",
        });
        return;
      }

      const user = await AuthService.login(username, password);

      const isValid = await bcrypt.compare(password, user?.password);

      if (!isValid || !user) {
        res.json({
          status: "Error",
          error: "Username and/or password are invalid",
        });
        return;
      }

      const encodedPayloadBase64 = Buffer.from(
        JSON.stringify({
          id: user.id,
          username: user.username,
          phone_number: user.phone_number,
        })
      ).toString("base64");

      const decodedPayloadBase64 = JSON.parse(
        Buffer.from(encodedPayloadBase64, "base64").toString("utf8")
      );

      console.log("encodedPayloadBase64: ", encodedPayloadBase64);
      console.log("decodedPayloadBase64: ", decodedPayloadBase64);

      const token = Jwt.sign(
        { ___: encodedPayloadBase64 },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      console.log("JWT: ", token);

      if (process.env.NODE_ENV === "development") {
        console.log("Set Cookie");
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
      } else {
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
      }

      res.json({
        status: "Success",
        message: "User logged in successfully",
        token,
      });
    } catch (error: any) {
      console.error("Error logging in user:", error);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
      return;
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, fullname, phone_number } = req.body;
      const credentialsAreEmpty = !username || !password
      if (credentialsAreEmpty) {
        res.json({
          status: "Error",
          error: "Username and password are required",
        });
        return;
      }

      if (credentialsAreEmpty || !fullname || !phone_number) {
        res.json({
          status: "Error",
          error: "Required fields are empty",
        });
        return;
      }

      await AuthService.register({
        username,
        password,
        fullname,
        phone_number,
      });

      res.json({
        status: "Success",
        message: "User registered successfully"
      });
    } catch (error: any) {
      console.error("Error registering user:", error);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
      return;
    }
  }
}

export default new AuthController();
