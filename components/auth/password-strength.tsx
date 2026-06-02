import { getPasswordStrengthLabel } from "@/lib/auth/password";

interface PasswordStrengthProps {
  score: number;
}

export function PasswordStrength({ score }: PasswordStrengthProps) {
  const label = getPasswordStrengthLabel(score);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Password strength</span>
        <span className="text-foreground">{label}</span>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded ${i < score ? "bg-foreground" : "bg-surface-strong"}`}
          />
        ))}
      </div>
    </div>
  );
}
