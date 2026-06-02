import { LockKeyhole } from "lucide-react";

import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function AccountLockedPage() {
  return (
    <StatusPanel
      icon={LockKeyhole}
      title="Account temporarily locked"
      description="We detected unusual activity and locked this account to protect your organization. Contact support to restore access."
      ctaLabel="Contact support"
      ctaHref="mailto:support@company.com"
      secondaryLabel="Back to sign in"
      secondaryHref={AUTH_ROUTES.signIn}
    />
  );
}
