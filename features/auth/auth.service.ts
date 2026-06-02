import { request } from "@/lib/api/client";
import type {
  AuthResult,
  ForgotPasswordPayload,
  OtpPayload,
  ResetPasswordPayload,
  Session,
  SignInPayload,
  SignUpPayload,
} from "@/types/auth";

function createSession(
  email: string,
  firstName = "Alex",
  lastName = "Taylor",
): Session {
  const now = Date.now();
  return {
    createdAt: now,
    user: {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      emailVerified: true,
      role: "member",
      twoFactorEnabled: true,
    },
    tokens: {
      accessToken: `acc_${Math.random().toString(36).slice(2)}`,
      refreshToken: `ref_${Math.random().toString(36).slice(2)}`,
      expiresAt: now + 1000 * 60 * 20,
    },
  };
}

export const authService = {
  async signIn(payload: SignInPayload): Promise<AuthResult> {
    await request<SignInPayload>("/sign-in", { body: payload });
    if (payload.email.endsWith("@unverified.com")) {
      return { requiresEmailVerification: true };
    }
    if (payload.email.endsWith("@2fa.com")) {
      return { requiresTwoFactor: true };
    }
    return { session: createSession(payload.email) };
  },
  async signUp(payload: SignUpPayload): Promise<AuthResult> {
    await request<SignUpPayload>("/sign-up", { body: payload });
    return { requiresEmailVerification: true };
  },
  async verifyEmail(payload: OtpPayload): Promise<AuthResult> {
    await request<OtpPayload>("/verify-email", { body: payload });
    return { session: createSession("verified@company.com") };
  },
  async resendVerificationCode(email: string) {
    await request<{ email: string }>("/verify-email/resend", {
      body: { email },
    });
  },
  async forgotPassword(payload: ForgotPasswordPayload) {
    await request<ForgotPasswordPayload>("/forgot-password", { body: payload });
  },
  async resetPassword(payload: ResetPasswordPayload) {
    await request<ResetPasswordPayload>("/reset-password", { body: payload });
  },
  async verifyTwoFactor(payload: OtpPayload): Promise<AuthResult> {
    await request<OtpPayload>("/two-factor/verify", { body: payload });
    return { session: createSession("member@company.com") };
  },
  async verifyRecoveryCode(code: string): Promise<AuthResult> {
    await request<{ code: string }>("/two-factor/recovery", { body: { code } });
    return { session: createSession("member@company.com") };
  },
};
