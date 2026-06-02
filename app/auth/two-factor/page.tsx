"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AUTH_ROUTES } from "@/constants/auth";

export default function TwoFactorPage() {
  return (
    <Card>
      <AuthHeader
        title="Two-factor authentication"
        description="This feature is not available."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <Alert variant="error">
        Two-factor authentication is not currently supported. Please sign in
        using your email and password.
      </Alert>
      <Button
        type="button"
        className="w-full"
        onClick={() => (window.location.href = AUTH_ROUTES.signIn)}
      >
        Back to sign in
      </Button>
    </Card>
  );
}
