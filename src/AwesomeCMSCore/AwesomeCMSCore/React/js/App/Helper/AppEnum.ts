export enum AppEnum {
	AuthToken = "authToken"
}

export enum PostStatus {
	Published = 1,
	Draft = 2,
	Deleted = 3
}

export enum StatusCode {
	Success = 200,
	BadRequest = 400,
	NotAuthorize = 401,
	Forbid = 403,
	NotFound = 404,
	InternalError = 500,
	EmailNotConfirmed = 900,
	ResetPassTokenExpire = 901
}

export enum CommentStatus {
	Pending = 1,
	Approved = 2,
	Spam = 3,
	Trash = 4
}
