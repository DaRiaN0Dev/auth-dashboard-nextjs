export function AuthIllustration() {
  return (
    <div className="border-border bg-surface relative hidden h-full min-h-[560px] overflow-hidden rounded-2xl border p-8 lg:block">
      <div className="bg-foreground/5 absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" />
      <div className="relative z-10 space-y-8">
        <div className="border-border bg-background/80 text-muted inline-flex items-center rounded-full border px-3 py-1 text-xs">
          Enterprise-grade Identity
        </div>
        <div className="space-y-3">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            Secure access built for modern teams.
          </h2>
          <p className="text-muted max-w-md text-sm leading-6">
            Unified authentication, session security, and role-aware access
            controls designed for high-trust SaaS products.
          </p>
        </div>
        <svg viewBox="0 0 480 320" className="w-full" aria-hidden>
          <rect
            x="16"
            y="16"
            width="448"
            height="288"
            rx="20"
            fill="currentColor"
            className="text-surface-strong"
          />
          <rect
            x="44"
            y="52"
            width="392"
            height="56"
            rx="14"
            fill="currentColor"
            className="text-background"
          />
          <rect
            x="44"
            y="128"
            width="186"
            height="148"
            rx="14"
            fill="currentColor"
            className="text-background"
          />
          <rect
            x="250"
            y="128"
            width="186"
            height="68"
            rx="14"
            fill="currentColor"
            className="text-background"
          />
          <rect
            x="250"
            y="208"
            width="186"
            height="68"
            rx="14"
            fill="currentColor"
            className="text-background"
          />
          <circle
            cx="86"
            cy="80"
            r="10"
            fill="currentColor"
            className="text-foreground/70"
          />
          <rect
            x="106"
            y="72"
            width="120"
            height="16"
            rx="8"
            fill="currentColor"
            className="text-foreground/15"
          />
          <rect
            x="64"
            y="156"
            width="140"
            height="12"
            rx="6"
            fill="currentColor"
            className="text-foreground/15"
          />
          <rect
            x="64"
            y="178"
            width="114"
            height="10"
            rx="5"
            fill="currentColor"
            className="text-foreground/10"
          />
          <rect
            x="270"
            y="154"
            width="140"
            height="10"
            rx="5"
            fill="currentColor"
            className="text-foreground/10"
          />
          <rect
            x="270"
            y="232"
            width="120"
            height="10"
            rx="5"
            fill="currentColor"
            className="text-foreground/10"
          />
        </svg>
      </div>
    </div>
  );
}
