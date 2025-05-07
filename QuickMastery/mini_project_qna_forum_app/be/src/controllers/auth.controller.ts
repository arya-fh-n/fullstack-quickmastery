import { Request, Response } from "express";
import AuthService from "../service/auth.service.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateTokens } from "../utils/token.utils.js";

dotenv.config();

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, rememberMe } = req.body;

      if (!username || !password) {
        res.status(400).json({
          status: "Bad Request",
          error: "Username and password are required",
        });
        return;
      }

      const user = await AuthService.login(username, password);

      if (!user) {
        res.status(401).json({
          status: "Unauthorized",
          error: "Username and/or password are invalid",
        });
        return;
      }

      const isValid = await bcrypt.compare(password, user?.password);

      if (!isValid) {
        res.status(401).json({
          status: "Unauthorized",
          error: "Username and/or password are invalid",
        });
        return;
      }

      const { accessToken } = generateTokens(
        user.id,
        user.username,
        user.email,
        rememberMe
      );

      console.log("JWT: ", accessToken);

      if (process.env.NODE_ENV === "development") {
        console.log("Set Cookie: ", accessToken);
        res.cookie("accessToken", accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });
      } else {
        res.cookie("accessToken", accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
      }

      res.status(200).json({
        status: "Success",
        message: "User logged in successfully",
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
      const { username, password, email } = req.body;
      const credentialsAreEmpty = !username || !password || !email;
      if (credentialsAreEmpty) {
        res.status(400).json({
          status: "Bad Request",
          error: "Required credentials are empty",
        });
        return;
      }

      await AuthService.register({
        username,
        password,
        email,
      });

      res.status(200).json({
        status: "Success",
        message: "User registered successfully",
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

  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;
      const credentialsAreEmpty = !username || !password || !email;
      if (credentialsAreEmpty) {
        res.status(400).json({
          status: "Bad Request",
          error: "Required credentials are empty",
        });
        return;
      }

      await AuthService.registerAdmin({
        username,
        password,
        email,
      });

      res.status(200).json({
        status: "Success",
        message: "User registered successfully",
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
