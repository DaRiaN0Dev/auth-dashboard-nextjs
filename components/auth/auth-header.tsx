import Link from "next/link";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";

interface AuthHeaderProps {
  title: string;
  description: string;
  backlinkLabel?: string;
  backlinkHref?: string;
}

export function AuthHeader({
  title,
  description,
  backlinkLabel,
  backlinkHref,
}: AuthHeaderProps) {
  return (
    <header className="mb-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {title}
        </h1>
        <p className="text-muted mt-1 text-sm leading-6 text-balance">
          {description}
        </p>
        {backlinkHref && backlinkLabel ? (
          <Link
            href={backlinkHref}
            className="text-foreground focus-visible:ring-ring mt-2 inline-flex rounded-sm text-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {backlinkLabel}
          </Link>
        ) : null}
      </div>
      <div className="self-end sm:self-auto">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
