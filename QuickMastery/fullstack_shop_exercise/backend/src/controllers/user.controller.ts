import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof usersTable>;
type NewUser = InferInsertModel<typeof usersTable>;

class UserController extends AbstractModel {
  update(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await db.select().from(usersTable);
      const data: User[] = users;
      return res.json({ status: "Success", data: data });
    } catch (error) {
      console.error(error);
      return res.json({ status: "Error", message: "Failed to fetch users" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.json({ status: "Error", message: "Invalid user ID" });
      }
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1);

      if (user.length === 0) {
        return res.json({ status: "Error", message: "User not found" });
      }

      const data: User = user[0];

      return res.json({
        status: "Success",
        message: "User fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.json({ status: "Error", message: "Failed to fetch user" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ error: "Username and password are required" });
      }

      const newUser: NewUser = { username, password, active: true };
      await db.insert(usersTable).values(newUser);
      return res.json({
        status: "Success",
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.json({ status: "Error", message: "Failed to create user" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.json({ status: "Error", message: "Invalid user ID" });
      }

      await db.delete(usersTable).where(eq(usersTable.id, id));
      return res.json({ status: "Success", message: "User deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.json({ status: "Error", message: "Failed to delete user" });
    }
  }
}

export default new UserController();
