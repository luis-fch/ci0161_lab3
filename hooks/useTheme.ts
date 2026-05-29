import { useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme";
import { UseThemeReturn } from "../types/theme";

type ColorSchemeOverride = "light" | "dark" | null;

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
