"use client";

import type { ReactNode } from "react";

import { LaptopMinimal, Moon, Sun } from "lucide-react";

import type { ThemeMode } from "@/types/theme";

import { useTheme } from "@/hooks/use-theme";

const options: { label: string; value: ThemeMode; icon: ReactNode }[] = [
  { label: "Light", value: "light", icon: <Sun className="size-4" /> },
  { label: "Dark", value: "dark", icon: <Moon className="size-4" /> },
  {
    label: "System",
    value: "system",
    icon: <LaptopMinimal className="size-4" />,
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme, hydrated } = useTheme();

  if (!hydrated)
    return <div className="bg-surface h-9 w-28 rounded-lg" aria-hidden />;

  return (
    <div
      className="border-border bg-surface inline-flex max-w-full rounded-lg border p-1"
      role="radiogroup"
      aria-label="Theme"
    >
      {options.map((item) => (
        <button
          key={item.value}
          type="button"
          role="radio"
          aria-checked={theme === item.value}
          onClick={() => setTheme(item.value)}
          className={`focus-visible:ring-ring inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition focus-visible:ring-2 focus-visible:outline-none ${
            theme === item.value
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {item.icon}
          <span className="hidden sm:inline">{item.label}</span>
          <span className="sr-only sm:hidden">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
