export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  status: number;
  details?: Record<string, string[]>;
}

export class ApiError extends Error {
  code: string;
  status: number;
  details?: Record<string, string[]>;

  constructor(payload: ApiErrorResponse) {
    super(payload.message);
    this.name = "ApiError";
    this.code = payload.code;
    this.status = payload.status;
    this.details = payload.details;
  }
}
