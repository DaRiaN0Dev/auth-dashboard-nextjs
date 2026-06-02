"use client";

import { create } from "zustand";

import type { ResolvedTheme, ThemeMode } from "@/types/theme";

interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  hydrated: boolean;
  setTheme: (theme: ThemeMode) => void;
  initializeTheme: () => void;
}

const THEME_KEY = "ui.theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: ThemeMode): ResolvedTheme {
  if (theme === "system") return getSystemTheme();
  return theme;
}

function applyThemeToDom(theme: ResolvedTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",
  hydrated: false,
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
    }

    const resolved = resolveTheme(theme);
    applyThemeToDom(resolved);
    set({ theme, resolvedTheme: resolved });
  },
  initializeTheme: () => {
    const stored =
      typeof window === "undefined" ? null : localStorage.getItem(THEME_KEY);
    const theme: ThemeMode =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";
    const resolved = resolveTheme(theme);
    applyThemeToDom(resolved);

    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", () => {
        if (get().theme === "system") {
          const latest = getSystemTheme();
          applyThemeToDom(latest);
          set({ resolvedTheme: latest });
        }
      });
    }

    set({ theme, resolvedTheme: resolved, hydrated: true });
  },
}));
