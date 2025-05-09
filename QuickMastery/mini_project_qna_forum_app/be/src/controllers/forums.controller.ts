import { Request, Response } from "express";
import ForumsService from "../service/forums.service.js";
import {
  UserForumPostListResponse,
  UserForumPostDetailResponse,
  BaseResponse,
} from "src/types/response.types.js";
import {
  AdminUpdatePostStatus,
  NewForumComment,
  NewForumPost,
} from "src/types/index.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

class ForumsController {
  async createNewForum(req: Request, res: Response) {
    try {
      const data = req.body;

      const token = req.cookies.accessToken;

      const decoded = decodeAccessTokenCookie(token);
      if (!decoded) {
        const error: BaseResponse = {
          status: "Token Error",
          message: "Invalid or expired token",
        };

        res.status(403).json(error);
        return;
      }

      const body: NewForumPost = {
        userId: decoded.userId,
        title: data.title,
        content: data.content,
        data: JSON.stringify(data.data),
        status: "pending",
      };
  
      await ForumsService.postNewForum(body);

      const response: BaseResponse = {
        status: "Success",
        message: "Forum created successfully",
      };
      res.status(200).json(response);
    } catch (error: any) {
      console.error("Error creating forum: ", error);
      res.status(500).json({ error: "Failed to create forum" });
    }
  }

  async commentOnForum(req: Request, res: Response) {
    try {
      const data = req.body;
      const body: NewForumComment = {
        userId: data.userId,
        content: data.content,
        data: JSON.stringify(data.data),
        parentId: data.parentId,
      };
      await ForumsService.commentOnForum(body);
      const response: BaseResponse = {
        status: "Success",
        message: "Comment created successfully",
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error creating comment: ", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  }

  async getForumDetail(req: Request, res: Response) {
    try {
      const forumId = req.params.id;
      if (!forumId) {
        const error: BaseResponse = {
          status: "Bad Request",
          message: "Required forumId is empty",
        };
        res.status(400).json(error);
        return;
      }

      const forum = await ForumsService.getForumById(forumId);

      if (!forum) {
        const error: BaseResponse = {
          status: "Not Found",
          message: "Forum not found",
        };
        res.status(404).json(error);
        return;
      }

      const response: UserForumPostDetailResponse = {
        status: "Success",
        message: "Forum fetched successfully",
        data: forum,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting forum: ", error);
      res.status(500).json({ error: "Failed to get forum" });
    }
  }

  async getForumList(req: Request, res: Response) {
    try {
      const forumList = await ForumsService.getAllForums();

      if (!forumList) {
        const error: BaseResponse = {
          status: "Not Found",
          message: "Forum not found",
        };
        res.status(404).json(error);
        return;
      }

      const response: UserForumPostListResponse = {
        status: "Success",
        message: "Forum list fetched successfully",
        data: forumList,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting forum list: ", error);
      res.status(500).json({ error: "Failed to get forum list" });
    }
  }

  async getForumListAdmin(req: Request, res: Response) {
    try {
      const forumList = await ForumsService.getAllForumsAdmin();

      if (!forumList) {
        const error: BaseResponse = {
          status: "Not Found",
          message: "Forum not found",
        };
        res.status(404).json(error);
        return;
      }

      const response: UserForumPostListResponse = {
        status: "Success",
        message: "Forum list fetched successfully",
        data: forumList,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting forum list: ", error);
      res.status(500).json({ error: "Failed to get forum list" });
    }
  }

  async updatePostStatus(req: Request, res: Response) {
    try {
      const forumId = req.params.id;
      if (!forumId) {
        const error: BaseResponse = {
          status: "Bad Request",
          message: "Required forumId is empty",
        };
        res.status(400).json(error);
        return;
      }

      const data = req.body;

      const body: AdminUpdatePostStatus = {
        id: forumId,
        status: data.status,
        adminId: data.adminId,
        title: data.title,
        content: data.content,
      };

      await ForumsService.updatePostStatus(body);
      const response: BaseResponse = {
        status: "Success",
        message: "Post status updated successfully",
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error updating post status: ", error);
      res.status(500).json({ error: "Failed to update post status" });
    }
  }
}


function decodeAccessTokenCookie(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error: any) {
    return error;
  }
}

export default new ForumsController();
