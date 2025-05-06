import { db } from "../db/index.js";
import { NewLogs } from "src/types/index.js";
import dotenv from "dotenv";
import { forums as ForumsTable, logs as HistoryTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

type NewPostHistory = Omit<
    NewLogs,
    "id" | "createdAt" | "updatedAt"
>;

class LogsService {

    async createLog(log: NewPostHistory) {
        try {
            const newPostHistory: NewLogs = {
                ...log,
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const newLog = await db.insert(HistoryTable).values(newPostHistory);
            return newLog;
        } catch (error: any) {
            console.error("Error creating post history: ", error);
            return null;
        }
    }

    // TODO Refactor this
    async getLog() {
        try {
            const logs = await db.select().from(HistoryTable);
            return logs;
        } catch (error: any) {
            console.error("Error getting post history: ", error);
            return null;
        }
    }

}