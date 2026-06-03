"use client";

import { create } from "zustand";

import type {
  AuthState,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  Session,
  SignInPayload,
  SignUpPayload,
  VerifyEmailPayload,
} from "@/types/auth";

import { authService } from "@/features/auth/auth.service";
import { tokenManager } from "@/lib/auth/token-manager";
import { ApiError } from "@/types/api";

interface AuthStore extends AuthState {
  hydrateSession: () => Promise<void>;
  setSession: (session: Session | null) => void;
  signIn: (payload: SignInPayload) => Promise<{ next: "app" | "verify-email" }>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  verifyEmail: (payload: VerifyEmailPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  signOut: () => Promise<void>;
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
  hydrateSession: async () => {
    const tokens = tokenManager.get();

    if (!tokens) {
      set({ session: null, status: "unauthenticated" });
      return;
    }

    try {
      const session = await authService.getCurrentUser();
      tokenManager.set(session.tokens);
      set({ session, status: "authenticated" });
    } catch {
      tokenManager.clear();
      set({ session: null, status: "unauthenticated" });
    }
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
      await authService.verifyEmail(payload);
      set({ status: "unauthenticated" });
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
  signOut: async () => {
    const tokens = tokenManager.get();
    if (tokens?.refreshToken) {
      try {
        await authService.logout(tokens.refreshToken);
      } catch {
      }
    }
    tokenManager.clear();
    set({ session: null, status: "unauthenticated", error: null });
  },
  clearError: () => set({ error: null }),
}));
