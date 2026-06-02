import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface StatusPanelProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function StatusPanel({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: StatusPanelProps) {
  return (
    <Card className="mx-auto w-full max-w-xl text-center">
      <div className="bg-surface-strong mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon className="h-6 w-6" />
      </div>
      <h1 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h1>
      <p className="text-muted mx-auto mt-2 max-w-md text-sm leading-6 text-balance">
        {description}
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        <Link
          href={ctaHref}
          className="bg-foreground text-background focus-visible:ring-ring inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-center text-sm font-medium transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
        >
          {ctaLabel}
        </Link>
        {secondaryLabel && secondaryHref ? (
          <Link
            href={secondaryHref}
            className="border-border bg-surface text-foreground focus-visible:ring-ring hover:bg-surface-strong inline-flex min-h-10 items-center justify-center rounded-lg border px-4 py-2 text-center text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
