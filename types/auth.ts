export type UserRole = "admin" | "member" | "owner" | "viewer";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  twoFactorEnabled: boolean;
}

export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface Session {
  user: UserProfile;
  tokens: TokenSet;
  createdAt: number;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface OtpPayload {
  code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResult {
  requiresEmailVerification?: boolean;
  requiresTwoFactor?: boolean;
  session?: Session;
}

export interface AuthState {
  session: Session | null;
  status: "authenticated" | "idle" | "loading" | "unauthenticated";
  error: string | null;
}
