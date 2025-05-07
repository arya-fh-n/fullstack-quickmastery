import { db } from "../db/index.js";
import {
  AdminForumPost,
  NewForum,
  NewForumComment,
  NewForumPost,
  UserForumPost,
  AdminUpdatePostStatus,
  UserForumPostDetail,
  UserForumPostListItem,
} from "src/types/index.js";
import dotenv from "dotenv";
import { forums as ForumsTable, users as UsersTable } from "../db/schema.js";
import { generatePostId } from "../utils/generator.utils.js";
import { eq, and, isNull } from "drizzle-orm";

dotenv.config();

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

  async commentOnForum(data: NewForumComment) {
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
      console.error("Error posting comment: ", error);
      return null;
    }
  }

  async updatePostIsAnswered(id: string, answered: boolean) {
    try {
      const post = await db.select().from(ForumsTable).where(eq(ForumsTable.id, id));
      const existingData = JSON.parse(post[0].data ?? "{}");

      if (existingData.answered === true && answered === true) {
        throw new Error("AlreadyAnsweredError: Post is already answered");
      }

      const isAnswered = {
        answered: answered
      }

      const result = await db
        .update(ForumsTable)
        .set({ data: JSON.stringify({ ...isAnswered }) })
        .where(eq(ForumsTable.id, id));

      return result;
    } catch (error) {
      console.error("Error updating post: ", error);
      return null;
    }
  }

  async getForumById(id: string) {
    try {
      const forumDetail = await getForumPostDetail(id);
      return forumDetail;
    } catch (error) {
      console.error("Error getting forum: ", error);
      return null;
    }
  }

  async updatePostStatus(data: AdminUpdatePostStatus) {
    try {
      const existingForum = await db
        .select()
        .from(ForumsTable)
        .where(eq(ForumsTable.id, data.id))
        .limit(1);

      if (existingForum.length === 0) {
        return null;
      }

      if (existingForum[0].status === data.status) {
        throw new Error(
          "AlreadyUpdateError: Forum status is already " + data.status
        );
      }

      if (!["pending", "draft", "published"].includes(data.status)) {
        throw new Error("InvalidStatusError: Invalid status provided");
      }

      const updatedForum = await db
        .update(ForumsTable)
        .set({
          title: data.title,
          content: data.content,
          status: data.status,
          updatedAt: new Date(),
        })
        .where(eq(ForumsTable.id, data.id));

      return updatedForum;
    } catch (error) {
      console.error("Error updating forum: ", error);
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
        .where(and(isNull(ForumsTable.parentId), eq(ForumsTable.status, "published")))
        .innerJoin(UsersTable, eq(ForumsTable.userId, UsersTable.id));

      const forumsData: UserForumPostListItem[] = forums.map(
        (forum) => ({
          title: forum.title,
          content: forum.content,
          data: JSON.parse(forum.data ?? "{}"),
          createdAt: forum.createdAt,
          username: forum.username,
        })
      );
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

      const forumsData: AdminForumPost[] = forums.map((forum) => ({
        id: forum.id,
        parentId: forum.parentId,
        title: forum.title,
        content: forum.content,
        data: JSON.parse(forum.data ?? "{}"),
        username: forum.username,
        status: forum.status,
        createdAt: forum.createdAt,
        updatedAt: forum.updatedAt,
      }));
      return forumsData;
    } catch (error) {
      console.error("Error getting forums: ", error);
      return null;
    }
  }
}

async function getForumPostDetail(
  id: string
): Promise<UserForumPostDetail | null> {
  const forumPosts = await db.query.forums.findMany({
    columns: {
      id: true,
      parentId: true,
      title: true,
      content: true,
      data: true,
      status: true,
      createdAt: true,
    },
  });

  // Lookup list of posts
  const postLookup: Record<string, UserForumPostDetail> = forumPosts.reduce(
    (acc, post) => {
      acc[post.id] = {
        id: post.id,
        parentId: post.parentId,
        title: post.title,
        content: post.content,
        data: JSON.parse(post.data ?? "{}"),
        status: post.status,
        createdAt: post.createdAt,
        comments: [],
      };
      return acc;
    },
    {} as Record<string, UserForumPostDetail>
  );

  // Walk up to the root
  let currentId = id;
  while (postLookup[currentId]?.parentId !== null) {
    currentId = postLookup[currentId].parentId!;
  }

  // Set root post
  const rootPost = postLookup[currentId];

  // Collect comments (DFS traversal), sort and flatten
  const allComments: UserForumPost[] = [];
  const stack: UserForumPostDetail[] = [rootPost];

  if (rootPost) {
    stack.push(rootPost);
  }

  while (stack.length > 0) {
    const currentPost = stack.pop();
    if (!currentPost) continue;

    const comments = Object.values(postLookup).filter(
      (post) => post.parentId === currentPost.id
    );

    for (const child of comments) {
      const { comments: _, ...flatChild } = child;
      allComments.push(flatChild);
      if (child) {
        stack.push(child);
      }
    }
  }

  allComments.sort((a, b) => {
    const dateA = new Date(a.createdAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? 0).getTime();
    return dateA - dateB;
  });

  rootPost.comments = allComments;

  return rootPost;
}

export default new ForumsService();
