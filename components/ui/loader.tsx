import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  label?: string;
}

export function Loader({ className, label }: LoaderProps) {
  return (
    <div
      className={cn(
        "text-muted inline-flex items-center gap-2 text-sm",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        aria-hidden
      />
      {label ? <span>{label}</span> : null}
    </div>
  );
}
