"use client";

import { AlertTriangle } from "lucide-react";

import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function AuthErrorPage() {
  return (
    <StatusPanel
      icon={AlertTriangle}
      title="Authentication flow interrupted"
      description="An unexpected error occurred while loading this security step."
      ctaLabel="Try again"
      ctaHref={AUTH_ROUTES.signIn}
    />
  );
}
