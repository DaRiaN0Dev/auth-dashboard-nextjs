"use client";

import { create } from "zustand";

import type {
  AuthState,
  ForgotPasswordPayload,
  OtpPayload,
  ResetPasswordPayload,
  Session,
  SignInPayload,
  SignUpPayload,
} from "@/types/auth";

import { authService } from "@/features/auth/auth.service";
import { tokenManager } from "@/lib/auth/token-manager";
import { ApiError } from "@/types/api";

interface AuthStore extends AuthState {
  hydrateSession: () => void;
  setSession: (session: Session | null) => void;
  signIn: (
    payload: SignInPayload,
  ) => Promise<{ next: "app" | "two-factor" | "verify-email" }>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  verifyEmail: (payload: OtpPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  verifyTwoFactor: (payload: OtpPayload) => Promise<void>;
  verifyRecoveryCode: (code: string) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please retry.";
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  status: "idle",
  error: null,
  hydrateSession: () => {
    const tokens = tokenManager.get();

    if (!tokens) {
      set({ session: null, status: "unauthenticated" });
      return;
    }

    set({
      status: "authenticated",
      session: {
        createdAt: Date.now(),
        tokens,
        user: {
          id: "persisted-user",
          firstName: "Current",
          lastName: "User",
          email: "current@company.com",
          emailVerified: true,
          role: "member",
          twoFactorEnabled: true,
        },
      },
    });
  },
  setSession: (session) => {
    if (session) tokenManager.set(session.tokens);
    else tokenManager.clear();
    set({
      session,
      status: session ? "authenticated" : "unauthenticated",
      error: null,
    });
  },
  signIn: async (payload) => {
    set({ status: "loading", error: null });

    try {
      const result = await authService.signIn(payload);

      if (result.requiresEmailVerification) {
        set({ status: "unauthenticated" });
        return { next: "verify-email" };
      }
      if (result.requiresTwoFactor) {
        set({ status: "unauthenticated" });
        return { next: "two-factor" };
      }
      if (result.session) {
        tokenManager.set(result.session.tokens);
        set({ session: result.session, status: "authenticated" });
      }

      return { next: "app" };
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  signUp: async (payload) => {
    set({ status: "loading", error: null });

    try {
      await authService.signUp(payload);
      set({ status: "unauthenticated" });
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  verifyEmail: async (payload) => {
    set({ status: "loading", error: null });

    try {
      const result = await authService.verifyEmail(payload);

      if (result.session) {
        tokenManager.set(result.session.tokens);
        set({ session: result.session, status: "authenticated" });
      } else {
        set({ status: "unauthenticated" });
      }
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  forgotPassword: async (payload) => {
    set({ status: "loading", error: null });

    try {
      await authService.forgotPassword(payload);
      set({ status: "unauthenticated" });
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  resetPassword: async (payload) => {
    set({ status: "loading", error: null });

    try {
      await authService.resetPassword(payload);
      set({ status: "unauthenticated" });
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  verifyTwoFactor: async (payload) => {
    set({ status: "loading", error: null });

    try {
      const result = await authService.verifyTwoFactor(payload);

      if (result.session) {
        tokenManager.set(result.session.tokens);
        set({ session: result.session, status: "authenticated" });
      }
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  verifyRecoveryCode: async (code) => {
    set({ status: "loading", error: null });

    try {
      const result = await authService.verifyRecoveryCode(code);

      if (result.session) {
        tokenManager.set(result.session.tokens);
        set({ session: result.session, status: "authenticated" });
      }
    } catch (error) {
      set({ status: "unauthenticated", error: getErrorMessage(error) });
      throw error;
    }
  },
  signOut: () => {
    tokenManager.clear();
    set({ session: null, status: "unauthenticated", error: null });
  },
  clearError: () => set({ error: null }),
}));
