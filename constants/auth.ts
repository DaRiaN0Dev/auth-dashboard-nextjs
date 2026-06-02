export const AUTH_ROUTES = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  verifyEmail: "/auth/verify-email",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  twoFactor: "/auth/two-factor",
  magicLink: "/auth/magic-link",
  accountLocked: "/auth/account-locked",
  sessionExpired: "/auth/session-expired",
  accessDenied: "/auth/access-denied",
  maintenance: "/maintenance",
} as const;

export const PASSWORD_REQUIREMENTS = [
  "At least 8 characters",
  "One uppercase letter",
  "One lowercase letter",
  "One number",
] as const;

export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 30;
