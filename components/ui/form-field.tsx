import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-foreground block text-sm font-medium"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-muted text-xs">{hint}</p> : null}
      <p
        className={cn(
          "min-h-4 text-xs",
          error ? "text-red-600 dark:text-red-300" : "text-transparent",
        )}
      >
        {error ?? "."}
      </p>
    </div>
  );
}
