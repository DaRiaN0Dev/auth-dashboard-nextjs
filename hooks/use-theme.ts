"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/store/theme-store";

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  const hydrated = useThemeStore((state) => state.hydrated);
  const setTheme = useThemeStore((state) => state.setTheme);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return { theme, resolvedTheme, hydrated, setTheme };
}
