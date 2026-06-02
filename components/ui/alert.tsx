import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type AlertVariant = "info" | "error" | "success";

const styles: Record<AlertVariant, string> = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
  error: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300",
  success:
    "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
};

const icons = {
  info: Info,
  error: AlertCircle,
  success: CheckCircle2,
} as const;

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({ className, variant = "info", ...props }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
        styles[variant],
        className,
      )}
      role="status"
      {...props}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{props.children}</div>
    </div>
  );
}
