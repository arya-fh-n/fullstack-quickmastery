import dotenv from "dotenv";
import { EnvVars } from "src/types";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";
import { drizzle } from "drizzle-orm/mysql2";
import { generatePostId, generateUserId } from "../utils/generator.utils.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const env: EnvVars = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306", 3306),
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_NAME: process.env.DB_NAME ?? "my_express_app",
  PORT: parseInt(process.env.PORT ?? "3000", 3000),
};

const connection = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(connection, {
  schema: schema,
  mode: "default",
});

export async function testConnection(): Promise<boolean> {
  try {
    // Simple query to test connection
    const [result] = await connection.query("SELECT 1 AS result");
    console.log("Database connection successful!", result);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

const adminId = generateUserId("admin");
const userId = generateUserId("user");

const postId1 = generatePostId(process.env.POST_ID_SEQ as string);
const postId2 = generatePostId(process.env.POST_ID_SEQ as string);
const postId3 = generatePostId(process.env.POST_ID_SEQ as string);

export async function seed() {
  const admin: typeof schema.users.$inferInsert = {
    id: adminId,
    username: "admin",
    password: "admin",
    email: "adminmail@gmail.com",
    role: "admin",
  };

  const user: typeof schema.users.$inferInsert = {
    id: userId,
    username: "user",
    password: "user",
    email: "usermail@outlook.com",
    role: "user",
  };

  await db.insert(schema.users).values(admin);
  await db.insert(schema.users).values(user);

  const forumPost: typeof schema.forums.$inferInsert = {
    id: postId1,
    userId: userId,
    title: "Test Forum",
    content: "Ini adalah forum pertama",
    parentId: null,
    status: "published",
    data: JSON.stringify({ answered: true }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const forumComment1: typeof schema.forums.$inferInsert = {
    id: postId2,
    userId: adminId,
    title: "", /** Title is not required if forum post is a comment */
    content: "Ini adalah post berupa comment dari forum pertama",
    parentId: postId1,
    status: "published",
    data: null,
    createdAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    updatedAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
  };

  const forumComment2: typeof schema.forums.$inferInsert = {
    id: postId3,
    userId: userId,
    title: "", /** Title is not required if forum post is a comment */
    content: "Ini adalah post berupa comment kedua dari forum pertama",
    parentId: postId2,
    status: "pending",
    data: null,
    createdAt: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
    updatedAt: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
  };

  await db.insert(schema.forums).values(forumPost);
  await db.insert(schema.forums).values(forumComment1);
  await db.insert(schema.forums).values(forumComment2);

  const userLogs1: typeof schema.logs.$inferInsert = {
    id: uuidv4(),
    userId: userId,
    code: "FORUM",
    action: "POST",
    description: "Created a new forum.",
    data: JSON.stringify({ id: postId1, parent_id: null }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userLogs2: typeof schema.logs.$inferInsert = {
    id: uuidv4(),
    userId: userId,
    code: "FORUM",
    action: "COMMENT",
    description: "Commented on a forum.",
    data: JSON.stringify({ postId: postId3, parent_id: postId2 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const adminLogs: typeof schema.logs.$inferInsert = {
    id: uuidv4(),
    userId: adminId,
    code: "FORUM",
    action: "COMMENT",
    description: "Commented on a forum.",
    data: JSON.stringify({ postId: postId2, parent_id: postId1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await db.insert(schema.logs).values(userLogs1);
  await db.insert(schema.logs).values(adminLogs);
  await db.insert(schema.logs).values(userLogs2);
  console.log("Seeding done.");
}

export async function cleanTables() {
  await db.delete(schema.logs);
  await db.delete(schema.forums);
  await db.delete(schema.users);
  console.log("Tables cleaned.");
}

export async function seedThenClean() {
    seed();
    console.log("Seeding done. Cleaning...");
    cleanTables();
}
