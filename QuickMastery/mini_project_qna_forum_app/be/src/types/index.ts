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

export type NewForumPost = Omit<
  NewForum,
  "id" | "parentId" | "createdAt" | "updatedAt"
>;
export type NewForumComment = Omit<
  NewForum,
  "id" | "title" | "createdAt" | "updatedAt"
>;

export type UserForumPost = Omit<Forums, "updatedAt" | "userId">;
export type UserForumPostDetail = UserForumPost & { comments: UserForumPost[] };
export type UserForumPostListItem = Omit<
  UserForumPost,
  "parentId" | "status"
> & {
  username: string;
};

export type AdminForumPost = Omit<Forums, "userId"> & { username: string };
export type AdminUpdatePostStatus = {
  id: string;
  adminId: string;
  title: string;
  content: string;
  status: "pending" | "draft" | "published";
};

export type NewPostHistory = Omit<NewLogs, "id" | "createdAt" | "updatedAt">;
export type UserPostHistory = {
  action: "POST" | "COMMENT";
  postId: string;
  title: string;
  content: string;
  data: string;
  createdAt: Date | null;
};

export type AdminLogsData = {
  postId: string;
  userId: string;
  title: string;
  content: string;
  data: string | null;
  action: "POST" | "COMMENT";
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type RegisterUser = Omit<NewUser, "id" | "createdAt" | "updatedAt">;
