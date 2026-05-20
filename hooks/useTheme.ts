import { useState } from "react";
import { useColorScheme } from "react-native";
import { AppTheme, darkTheme, lightTheme } from "../constants/theme";

type ColorSchemeOverride = "light" | "dark" | null;

export interface UseThemeReturn {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: "light" | "dark") => void;
  resetToSystem: () => void;
}

export function useTheme(): UseThemeReturn {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ColorSchemeOverride>(null);

  const active = override ?? systemScheme ?? "dark";
  const isDark = active === "dark";

  const toggleTheme = () => {
    setOverride(isDark ? "light" : "dark");
  };

  const setTheme = (scheme: "light" | "dark") => {
    setOverride(scheme);
  };

  const resetToSystem = () => {
    setOverride(null);
  };

  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme,
    setTheme,
    resetToSystem,
  };
}
