"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);
  const signOut = useAuthStore((state) => state.signOut);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);

  useEffect(() => {
    if (status === "idle") {
      hydrateSession();
    }
  }, [status, hydrateSession]);

  return { session, status, error, signOut };
}
