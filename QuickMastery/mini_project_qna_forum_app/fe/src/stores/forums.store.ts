/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../api/axios";
import type {
  ApiStatus,
  AxiosResponseWrapper,
  BaseResponse,
  ForumData,
  ForumDataAdmin,
} from "../types";

interface ForumActions {
  fetchForums: () => Promise<void>;
  fetchForumDetail: (id: string) => Promise<void>;
  createForum: (forumData: any) => Promise<boolean>;
  addComment: (forumId: string) => Promise<boolean>;
  updateForumStatus: (
    id: string,
    status: "pending" | "published" | "draft"
  ) => Promise<boolean>;
  clearForums: () => void;
  clearError: () => void;
}

interface ForumStoreState {
  forums: ForumData[];
  forumDetail: any;
  forumsAdmin: ForumDataAdmin[];
  status: ApiStatus;
  error: string | null;
}

type ForumStore = ForumStoreState & ForumActions;

export const useForumStore = create<ForumStore>((set) => ({
  forums: [],
  forumDetail: null,
  forumsAdmin: [],
  status: "idle",
  error: null,

  fetchForums: async () => {
    set({ status: "loading", error: null });
    try {
      const response: AxiosResponseWrapper<BaseResponse<ForumData[]>> = await api.get("/forums");
      console.log(response.data.data);
      const data = response.data.data?.map((forum) => ({
        ...forum,
        isAnswered: forum.data?.answered as boolean ?? false,
      }));
      set({ forums: data, status: "success" });
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message,
      });
    }
  },

  fetchForumDetail: async (id: string) => {
    set({ status: "loading", error: null });
    try {
      const response = await api.get(`/forums/nested/${id}`);
      set({ forumDetail: response.data.data, status: "success" });
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message,
      });
    }
  },

  createForum: async (forumData: any) => {
    set({ status: "loading", error: null });
    try {
      await api.post("/forums", forumData);
      set({ status: "success", error: null });
      return true;
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message,
      });
      return false;
    }
  },

  addComment: async (commentData: any) => {
    set({ status: "loading", error: null });
    try {
      await api.post(`forums/`, commentData);
      set({ status: "success", error: null });
      return true;
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message,
      });
      return false;
    }
  },

  fetchAdminForums: async () => {
    set({ status: "loading", error: null });
    try {
      const response = await api.get("/forums/admin");
      set({ forums: response.data.data, error: null });
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message
      });
    }
  },

  updateForumStatus: async (id: string, updateData: any) => {
    set({ status: "loading", error: null });
    try {
      await api.put(`/forums/${id}`, { id, ...updateData });
      set({ status: "success", error: null });
      return true;
    } catch (err) {
      const error = err as BaseResponse<ForumData[]>;
      const message = "Error: " + error.code + " - " + error.message;
      set({
        status: "error",
        error: message
      });
      return false;
    }
  },

  clearForums: () => set({ forums: [], forumDetail: null }),

  clearError: () => set({ error: null }),
}));
