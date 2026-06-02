import type { ApiErrorResponse, ApiSuccess } from "@/types/api";

import { ApiError } from "@/types/api";

interface RequestConfig {
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  body?: unknown;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function subscribeToRefresh(callback: (token: string | null) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function createApiError(
  message: string,
  status = 400,
  code = "REQUEST_FAILED",
  details?: Record<string, string[]>,
) {
  const payload: ApiErrorResponse = {
    code,
    message,
    status,
    details,
  };
  return new ApiError(payload);
}

function getErrorMessageByStatus(status: number, message?: string): string {
  const statusMessages: Record<number, string> = {
    401: "Authentication required. Please sign in.",
    403: "You don't have permission to access this resource.",
    404: "The requested resource was not found.",
    409: "This resource already exists or conflicts with existing data.",
    422: "Invalid input. Please check your data and try again.",
    429: "Too many requests. Please wait and try again later.",
    500: "Something went wrong on our end. Please try again.",
  };

  return message || statusMessages[status] || "An unexpected error occurred.";
}

async function refreshAccessToken(): Promise<string | null> {
  const { tokenManager } = await import("@/lib/auth/token-manager");
  const tokens = tokenManager.get();

  if (!tokens?.refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const newTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAt,
    };

    tokenManager.set(newTokens);
    return newTokens.accessToken;
  } catch {
    return null;
  }
}

export async function request<T>(
  path: string,
  config: RequestConfig = {},
): Promise<ApiSuccess<T>> {
  const { method = "POST", body, headers: customHeaders, credentials } = config;
  const { tokenManager } = await import("@/lib/auth/token-manager");
  const tokens = tokenManager.get();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (customHeaders) {
    if (typeof customHeaders === "object" && !Array.isArray(customHeaders)) {
      Object.assign(headers, customHeaders);
    }
  }

  if (tokens?.accessToken) {
    headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  let response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: credentials || "include",
  });

  if (
    response.status === 401 &&
    tokens?.refreshToken &&
    !path.includes("/auth/refresh")
  ) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing = false;
      onRefreshed(newToken);

      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(`${API_BASE}${path}`, {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
          credentials: credentials || "include",
        });
      } else {
        tokenManager.clear();

        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign-in";
        }

        throw createApiError(
          "Session expired. Please sign in again.",
          401,
          "SESSION_EXPIRED",
        );
      }
    } else {
      await new Promise((resolve) => {
        subscribeToRefresh((token) => {
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }

          resolve(undefined);
        });
      });

      response = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        credentials: credentials || "include",
      });
    }
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        code: "UNKNOWN_ERROR",
        message: getErrorMessageByStatus(response.status),
        status: response.status,
      };
    }

    throw createApiError(
      getErrorMessageByStatus(response.status, errorData.message),
      response.status,
      errorData.code,
      errorData.details,
    );
  }

  const data = await response.json();
  return { data };
}
