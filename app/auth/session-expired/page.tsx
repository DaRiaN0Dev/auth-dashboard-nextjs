import { Clock3 } from "lucide-react";

import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function SessionExpiredPage() {
  return (
    <StatusPanel
      icon={Clock3}
      title="Session expired"
      description="For your security, your session has ended. Sign in again to continue."
      ctaLabel="Re-login"
      ctaHref={AUTH_ROUTES.signIn}
    />
  );
}
