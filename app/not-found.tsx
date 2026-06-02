import { Compass } from "lucide-react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

export default function NotFound() {
  return (
    <AuthLayout>
      <StatusPanel
        icon={Compass}
        title="Page not found"
        description="The page you are looking for does not exist or was moved."
        ctaLabel="Back to sign in"
        ctaHref={AUTH_ROUTES.signIn}
      />
    </AuthLayout>
  );
}
