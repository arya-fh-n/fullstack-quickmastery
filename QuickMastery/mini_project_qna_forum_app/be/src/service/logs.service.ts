import { db } from "../db/index.js";
import { NewLogs, NewPostHistory, UserPostHistory } from "src/types/index.js";
import dotenv from "dotenv";
import { forums as ForumsTable, logs as HistoryTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

class LogsService {

  async createLog(data: NewPostHistory) {
    try {
      const newPostHistory: NewLogs = {
        ...data,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newLog = await db.insert(HistoryTable).values(newPostHistory);
      return newLog;
    } catch (error: any) {
      console.error("Error creating post history: ", error);
      return null;
    }
  }

  async getLog(userId: string) {
    try {
      const logs = await db
        .select({
          postId: ForumsTable.id,
          action: HistoryTable.action,
          title: ForumsTable.title,
          content: ForumsTable.content,
          data: ForumsTable.data,
          createdAt: HistoryTable.createdAt,
        })
        .from(HistoryTable)
        .where(eq(HistoryTable.userId, userId))
        .innerJoin(ForumsTable, eq(HistoryTable.userId, ForumsTable.userId));
      const userLogs: UserPostHistory[] = logs.map((log) => ({
        ...log,
        data: JSON.parse(log.data ?? "{}"),
      }));
      return userLogs;
    } catch (error: any) {
      console.error("Error getting post history: ", error);
      return null;
    }
  }

  async getLogAdmin(userId: string) {
    try {
      const logs = await db
        .select({
          postId: ForumsTable.id,
          userId: ForumsTable.userId,
          title: ForumsTable.title,
          content: ForumsTable.content,
          data: ForumsTable.data,
          action: HistoryTable.action,
          createdAt: HistoryTable.createdAt,
          updatedAt: HistoryTable.updatedAt
        })
        .from(HistoryTable)
        .where(eq(HistoryTable.userId, userId))
        .innerJoin(ForumsTable, eq(HistoryTable.userId, ForumsTable.userId));
      return logs;
    } catch (error: any) {
      console.error("Error getting post history: ", error);
      return null;
    }
  }
}

export default new LogsService();