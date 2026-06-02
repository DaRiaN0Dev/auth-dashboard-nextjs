import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "border-border bg-background text-foreground placeholder:text-muted focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
});
