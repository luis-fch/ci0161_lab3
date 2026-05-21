import React, { createContext, useContext } from "react";
import { useTheme, UseThemeReturn } from "../hooks/useTheme";

const ThemeContext = createContext<UseThemeReturn | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme(): UseThemeReturn {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
