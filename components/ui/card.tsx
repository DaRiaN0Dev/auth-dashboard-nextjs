import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border bg-surface w-full min-w-0 rounded-2xl border p-4 shadow-sm sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
