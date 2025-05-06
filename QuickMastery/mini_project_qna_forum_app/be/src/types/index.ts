import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as schema from "../db/schema.js";

export interface EnvVars {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PORT: number;
  }

  export type Forums = InferSelectModel<typeof schema.forums>;
  export type NewForum = InferInsertModel<typeof schema.forums>;

  export type Users = InferSelectModel<typeof schema.users>;
  export type NewUser = InferInsertModel<typeof schema.users>;

  export type Logs = InferSelectModel<typeof schema.logs>;
  export type NewLogs = InferInsertModel<typeof schema.logs>;
  