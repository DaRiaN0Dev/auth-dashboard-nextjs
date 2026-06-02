import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="text-muted inline-flex items-start gap-2 text-sm">
      <input
        type="checkbox"
        className={cn(
          "border-border accent-foreground focus-visible:ring-ring mt-1 h-4 w-4 rounded border focus-visible:ring-2",
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
