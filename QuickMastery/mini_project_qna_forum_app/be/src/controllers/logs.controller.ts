import { Request, Response } from "express";
import LogsService from "../service/logs.service.js";
import {
  BaseResponse,
  LogAdminResponse,
  UserPostHistoryResponse,
} from "src/types/response.types.js";

class LogsController {
  async createLog(req: Request, res: Response) {
    try {
      const data = req.body;
      await LogsService.createLog(data);
      const response: BaseResponse = {
        status: "Success",
        message: "Post history created successfully",
      };
      res.status(200).json(response);
    } catch (error: any) {
      console.error("Error creating post history: ", error);
      res.status(500).json({ error: "Failed to create post history" });
    }
  }

  async getLog(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const logs = await LogsService.getLog(userId);
      const response: UserPostHistoryResponse = {
        status: "Success",
        message: "Post history fetched successfully",
        data: logs?.map((log) => ({
          ...log,
          data: JSON.parse(log.data ?? ""),
        })),
      };
      res.status(200).json(response);
    } catch (error: any) {
      console.error("Error getting post history: ", error);
      res.status(500).json({ error: "Failed to get post history" });
    }
  }

  async getLogAdmin(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const logs = await LogsService.getLogAdmin(userId);
      const response: LogAdminResponse = {
        status: "Success",
        message: "Post history fetched successfully",
        data: logs?.map((log) => ({
          ...log,
          data: JSON.parse(log.data ?? "{}"),
        })),
      };
      res.status(200).json(response);
    } catch (error: any) {
      console.error("Error getting post history: ", error);
      res.status(500).json({ error: "Failed to get post history" });
    }
  }

}

export default new LogsController();