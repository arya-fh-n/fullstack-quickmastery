import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  out: "./src/db/migrations",
  schema: "src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 3306,
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "mini_project_qna_forum",
  },
} as Config;
