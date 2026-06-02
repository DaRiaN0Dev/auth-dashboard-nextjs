import { Wrench } from "lucide-react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function MaintenancePage() {
  return (
    <AuthLayout>
      <StatusPanel
        icon={Wrench}
        title="Scheduled maintenance"
        description="We are applying security and reliability upgrades. Service will be available again shortly."
        ctaLabel="Back to sign in"
        ctaHref={AUTH_ROUTES.signIn}
      />
    </AuthLayout>
  );
}
