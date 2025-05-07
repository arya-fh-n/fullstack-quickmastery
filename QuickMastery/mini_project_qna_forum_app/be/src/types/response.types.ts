import * as types from ".";

interface BaseResponse {
    status: string;
    message: string;
}

interface LogAdminResponse extends BaseResponse {
    data?: types.AdminLogsData[];
}

interface UserPostHistoryResponse extends BaseResponse {
    data?: types.UserPostHistory[];
}

interface UserForumPostListResponse extends BaseResponse {
    data?: types.UserForumPostListItem[] | types.AdminForumPost[];
}

interface UserForumPostDetailResponse extends BaseResponse {
    data?: types.UserForumPostDetail;
}

export {
    BaseResponse,
    LogAdminResponse,
    UserPostHistoryResponse,
    UserForumPostListResponse,
    UserForumPostDetailResponse
}