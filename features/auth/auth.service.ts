import { request } from "@/lib/api/client";
import type {
  AuthResult,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  Session,
  SignInPayload,
  SignUpPayload,
  VerifyEmailPayload,
} from "@/types/auth";

interface BackendSignInResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    role: string;
  };
}

interface BackendUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: string;
}

function mapBackendSession(data: BackendSignInResponse): Session {
  const validRoles = ["admin", "member", "owner", "viewer"] as const;
  const role = validRoles.includes(data.user.role as any)
    ? (data.user.role as "admin" | "member" | "owner" | "viewer")
    : "member";

  return {
    createdAt: Date.now(),
    user: {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      emailVerified: data.user.emailVerified,
      role,
    },
    tokens: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAt,
    },
  };
}

export const authService = {
  async signIn(payload: SignInPayload): Promise<AuthResult> {
    const { email, password } = payload;
    const { data } = await request<BackendSignInResponse>("/auth/sign-in", {
      method: "POST",
      body: { email, password },
    });
    return { session: mapBackendSession(data) };
  },

  async signUp(payload: SignUpPayload): Promise<AuthResult> {
    await request<void>("/auth/sign-up", {
      method: "POST",
      body: payload,
    });
    return { requiresEmailVerification: true };
  },

  async verifyEmail(payload: VerifyEmailPayload): Promise<AuthResult> {
    await request<{ success: boolean }>("/auth/verify-email", {
      method: "POST",
      body: payload,
    });
    return {};
  },

  async sendVerificationEmail(): Promise<void> {
    await request<void>("/auth/send-verification-email", {
      method: "POST",
    });
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await request<void>("/auth/forgot-password", {
      method: "POST",
      body: payload,
    });
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await request<void>("/auth/reset-password", {
      method: "POST",
      body: payload,
    });
  },

  async getCurrentUser(): Promise<Session> {
    const { data } = await request<BackendSignInResponse>("/auth/me", {
      method: "GET",
    });
    return mapBackendSession(data);
  },

  async logout(refreshToken: string): Promise<void> {
    await request<void>("/auth/logout", {
      method: "POST",
      body: { refreshToken },
    });
  },

  async logoutAll(): Promise<void> {
    await request<void>("/auth/logout-all", {
      method: "POST",
    });
  },

  async getSessions(): Promise<BackendUserResponse[]> {
    const { data } = await request<BackendUserResponse[]>("/auth/sessions", {
      method: "GET",
    });
    return data;
  },
};
