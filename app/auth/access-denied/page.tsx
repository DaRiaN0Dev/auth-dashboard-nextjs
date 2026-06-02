import { ShieldX } from "lucide-react";

import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function AccessDeniedPage() {
  return (
    <StatusPanel
      icon={ShieldX}
      title="Access denied"
      description="Your current role does not have permission to view this resource. Request access from your workspace administrator."
      ctaLabel="Go to sign in"
      ctaHref={AUTH_ROUTES.signIn}
    />
  );
}
