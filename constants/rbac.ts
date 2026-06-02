import type { UserRole } from "@/types/auth";

export const ROLE_PERMISSIONS: Record<UserRole, readonly string[]> = {
  owner: [
    "workspace:manage",
    "users:manage",
    "billing:manage",
    "security:manage",
  ],
  admin: ["workspace:manage", "users:manage", "security:manage"],
  member: ["workspace:read", "projects:write"],
  viewer: ["workspace:read"],
};
