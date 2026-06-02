import { CheckCircle2, MailCheck, TriangleAlert } from "lucide-react";

import { StatusPanel } from "@/components/auth/status-panel";
import { AUTH_ROUTES } from "@/constants/auth";

interface MagicLinkPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function MagicLinkPage({
  searchParams,
}: MagicLinkPageProps) {
  const params = await searchParams;
  const status = params.status ?? "waiting";

  if (status === "success") {
    return (
      <StatusPanel
        icon={CheckCircle2}
        title="Magic link confirmed"
        description="Your identity has been verified. You can continue to your secure workspace."
        ctaLabel="Continue to workspace"
        ctaHref="/"
        secondaryHref={AUTH_ROUTES.signIn}
        secondaryLabel="Back to sign in"
      />
    );
  }

  if (status === "error") {
    return (
      <StatusPanel
        icon={TriangleAlert}
        title="Link expired or invalid"
        description="This sign-in link is no longer valid. Request a new magic link and try again."
        ctaLabel="Request new link"
        ctaHref={AUTH_ROUTES.signIn}
        secondaryHref={AUTH_ROUTES.forgotPassword}
        secondaryLabel="Need help?"
      />
    );
  }

  return (
    <StatusPanel
      icon={MailCheck}
      title="Check your email"
      description="We sent a secure magic link. Open your email and click the link to finish signing in."
      ctaLabel="I opened the link"
      ctaHref={`${AUTH_ROUTES.magicLink}?status=success`}
      secondaryHref={AUTH_ROUTES.signIn}
      secondaryLabel="Use password instead"
    />
  );
}
