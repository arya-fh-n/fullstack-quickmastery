export interface ForumData {
  id: string;
  title: string;
  content: string;
  isAnswered: boolean;
  data?: { [key: string] : unknown };
  username: string;
  createdAt: string;
}

export type ForumDataAdmin = ForumData & {
  status: "pending" | "published" | "draft";
  updatedAt: string;
};

export type ApiStatus = "idle" | "success" | "loading" | "error";

export interface AxiosResponseWrapper<BaseResponse> {
  data: BaseResponse;
  status: number;
}

export interface BaseResponse<T> {
  status: string;
  message: string;
  code: string;
  data?: T;
}
