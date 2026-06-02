import type { ApiErrorResponse, ApiSuccess } from "@/types/api";

import { ApiError } from "@/types/api";

interface RequestConfig {
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  body?: unknown;
  headers?: HeadersInit;
}

const API_BASE = "/api/auth";

function createApiError(
  message: string,
  status = 400,
  code = "REQUEST_FAILED",
) {
  const payload: ApiErrorResponse = {
    code,
    message,
    status,
  };
  return new ApiError(payload);
}

export async function request<T>(
  path: string,
  config: RequestConfig = {},
): Promise<ApiSuccess<T>> {
  const { method = "POST", body, headers } = config;

  // Mock transport layer with production-safe contracts for future backend integration.
  await new Promise((resolve) => {
    setTimeout(resolve, 650);
  });

  if ((path satisfies string).includes("error")) {
    throw createApiError("Request failed. Try again.", 500, "INTERNAL_ERROR");
  }

  if (
    method === "POST" &&
    body &&
    typeof body === "object" &&
    "email" in (body as Record<string, unknown>)
  ) {
    const email = String((body as Record<string, unknown>).email);

    if (email.endsWith("@blocked.com")) {
      throw createApiError(
        "This account is temporarily locked.",
        423,
        "ACCOUNT_LOCKED",
      );
    }
  }

  void headers;
  void API_BASE;
  return { data: body as T };
}
