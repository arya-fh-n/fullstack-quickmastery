import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { User, NewUser } from "src/types/index.js";
import bcrypt from "bcrypt";

class UserController extends AbstractModel {
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.json({ status: "Error", message: "Invalid user ID" });
        return;
      }
      const { username, password, fullname, phone_number, active } = req.body;

      if (!username && !password && !fullname && !phone_number && !active) {
        res.json({ status: "Error", message: "No fields to update" });
        return;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db
          .update(usersTable)
          .set({
            ...req.body,
            password: hashedPassword,
          })
          .where(eq(usersTable.id, id));
      } else {
        await db
          .update(usersTable)
          .set({
            ...req.body,
          })
          .where(eq(usersTable.id, id));
      }

      res.json({
        status: "Success",
        message: `User ${id} updated successfully`,
      });
      return;
    } catch (error: any) {
      console.error("Error updating user:", error);
      res.json({ status: "Error", message: "Failed to update user" });
      return;
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await db.select().from(usersTable);
      const data: Omit<User, "password">[] = users;
      res.json({
        status: "Success",
        message: "Users fetched successfully",
        data: data,
      });
      return;
    } catch (error) {
      console.error(error);
      res.json({ status: "Error", message: "Failed to fetch users" });
      return;
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.json({ status: "Error", message: "Invalid user ID" });
        return;
      }
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1);

      if (user.length === 0) {
        res.json({ status: "Error", message: "User not found" });
        return;
      }

      const data: User = user[0];

      res.json({
        status: "Success",
        message: "User fetched successfully",
        data: data,
      });
      return;
    } catch (error) {
      console.error("Error fetching user:", error);
      res.json({ status: "Error", message: "Failed to fetch user" });
      return;
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, fullname, phone_number, role } = req.body;
      if (!username || !password) {
        res.json({ error: "Username and password are required" });
        return;
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser: NewUser = {
        username,
        password: encryptedPassword,
        fullname,
        phone_number,
        active: true,
        role: role,
      };
      await db.insert(usersTable).values(newUser);
      res.json({
        status: "Success",
        message: "User created successfully",
      });
      return;
    } catch (error) {
      console.error("Error creating user:", error);
      res.json({ status: "Error", message: "Failed to create user" });
      return;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.json({ status: "Error", message: "Invalid user ID" });
        return;
      }

      await db.delete(usersTable).where(eq(usersTable.id, id));
      res.json({ status: "Success", message: "User deleted" });
      return;
    } catch (error) {
      console.error("Error deleting user:", error);
      res.json({ status: "Error", message: "Failed to delete user" });
      return;
    }
  }
}

export default new UserController();
