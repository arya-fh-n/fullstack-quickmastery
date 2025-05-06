import { db } from "../db/index.js";
import { Forums, NewForum } from "src/types/index.js";
import dotenv from "dotenv";
import { forums as ForumsTable, users as UsersTable } from "../db/schema.js";
import { generatePostId } from "src/utils/utils.js";
import { eq } from "drizzle-orm";

dotenv.config();

type NewForumPost = Omit<
  NewForum,
  "id" | "parentId" | "createdAt" | "updatedAt"
>;
type NewForumComment = Omit<
  NewForum,
  "id" | "title" | "createdAt" | "updatedAt"
>;

class ForumsService {
  /**
   * Post forum baru
   * @param data: Data forum post baru
   * @returns Jika berhasil, maka akan mengembalikan data forum
   */
  async postNewForum(data: NewForumPost) {
    try {
      const newForum: NewForum = {
        ...data,
        id: generatePostId(process.env.POST_ID_SEQ as string),
        parentId: null,
      };

      const forum = await db.insert(ForumsTable).values(newForum);
      return forum;
    } catch (error) {
      console.error("Error creating forum: ", error);
      return null;
    }
  }

  async commentOnPost(data: NewForumComment) {
    try {
      const newComment: NewForum = {
        ...data,
        title: "",
        id: generatePostId(process.env.COMMENT_ID_SEQ as string),
        parentId: data.parentId,
      };

      const forum = await db.insert(ForumsTable).values(newComment);
      return forum;
    } catch (error) {
      console.error("Error creating forum: ", error);
      return null;
    }
  }

  async getAllForums() {
    try {
      const forums = await db
        .select({
          title: ForumsTable.title,
          content: ForumsTable.content,
          data: ForumsTable.data,
          createdAt: ForumsTable.createdAt,
          username: UsersTable.username,
        })
        .from(ForumsTable)
        .innerJoin(UsersTable, eq(ForumsTable.userId, UsersTable.id));

      const forumsData: Pick<
        Forums,
        "title" | "content" | "createdAt" | "data"
      >[] = forums.map((forum) => ({
        ...forum,
        data: JSON.parse(forum.data ?? "{}"),
      }));
      return forumsData;
    } catch (error) {
      console.error("Error getting forums: ", error);
      return null;
    }
  }

  async getAllForumsAdmin() {
    try {
      const forums = await db
        .select({
          id: ForumsTable.id,
          parentId: ForumsTable.parentId,
          title: ForumsTable.title,
          content: ForumsTable.content,
          username: UsersTable.username,
          data: ForumsTable.data,
          status: ForumsTable.status,
          createdAt: ForumsTable.createdAt,
          updatedAt: ForumsTable.updatedAt,
        })
        .from(ForumsTable)
        .innerJoin(UsersTable, eq(ForumsTable.userId, UsersTable.id));

      const forumsData: Omit<Forums, "userId">[] = forums.map((forum) => ({
        ...forum,
        data: JSON.parse(forum.data ?? "{}"),
      }));
      return forumsData;
    } catch (error) {
      console.error("Error getting forums: ", error);
      return null;
    }
  }
}

export default new ForumsService();
