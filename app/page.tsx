"use client";

import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Loader } from "@/components/ui/loader";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { AUTH_ROUTES } from "@/constants/auth";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { status, session, signOut, error } = useAuth();

  return (
    <main className="bg-background min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold sm:text-2xl">
            Authentication Console
          </h1>
          <ThemeSwitcher />
        </header>

        {status === "loading" ? (
          <Card className="space-y-3">
            <div className="bg-surface-strong h-5 w-48 animate-pulse rounded" />
            <div className="bg-surface-strong h-4 w-72 animate-pulse rounded" />
            <Loader label="Restoring secure session..." />
          </Card>
        ) : null}

        {status === "authenticated" && session ? (
          <Card className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold">
                  Welcome, {session.user.firstName} {session.user.lastName}
                </h2>
                <p className="text-muted text-sm break-words">
                  {session.user.email}
                </p>
              </div>
              <Badge variant="success">Active session</Badge>
            </div>
            <Divider />
            <div className="grid gap-2 sm:grid-cols-3">
              <Link
                href={AUTH_ROUTES.sessionExpired}
                className="border-border bg-surface hover:bg-surface-strong focus-visible:ring-ring rounded-lg border p-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                Session Expired
              </Link>
              <Link
                href={AUTH_ROUTES.accessDenied}
                className="border-border bg-surface hover:bg-surface-strong focus-visible:ring-ring rounded-lg border p-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                Access Denied
              </Link>
              <Link
                href={AUTH_ROUTES.maintenance}
                className="border-border bg-surface hover:bg-surface-strong focus-visible:ring-ring rounded-lg border p-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                Maintenance
              </Link>
            </div>
            <Button variant="secondary" onClick={signOut}>
              Sign out
            </Button>
          </Card>
        ) : null}

        {status === "unauthenticated" ? (
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">No active session</h2>
            <p className="text-muted text-sm">
              Sign in to continue to your workspace.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => (window.location.href = AUTH_ROUTES.signIn)}
              >
                Sign in
              </Button>
              <Link
                href={AUTH_ROUTES.signUp}
                className="border-border bg-surface hover:bg-surface-strong focus-visible:ring-ring inline-flex h-10 items-center rounded-lg border px-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                Sign up
              </Link>
            </div>
          </Card>
        ) : null}

        {error ? <Alert variant="error">{error}</Alert> : null}
      </div>
    </main>
  );
}
