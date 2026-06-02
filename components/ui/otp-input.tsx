"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  disabled,
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, idx) => value[idx] ?? "");

  return (
    <div className="flex max-w-full items-center justify-center gap-1 overflow-x-auto pb-1 sm:justify-between sm:gap-2">
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={char}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={`Digit ${index + 1}`}
          maxLength={1}
          className={cn(
            "border-border bg-background focus-visible:ring-ring h-11 w-9 rounded-lg border text-center text-base transition-colors outline-none focus-visible:ring-2 sm:h-12 sm:w-11 sm:text-lg",
          )}
          onChange={(event) => {
            const digit = event.target.value.replace(/\D/g, "").slice(-1);
            const next = value.split("");
            next[index] = digit;
            onChange(next.join("").slice(0, length));
            if (digit && index < length - 1) refs.current[index + 1]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !chars[index] && index > 0)
              refs.current[index - 1]?.focus();
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData
              .getData("text")
              .replace(/\D/g, "")
              .slice(0, length);
            if (!pasted) return;
            onChange(pasted);
            refs.current[Math.min(pasted.length, length) - 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}
