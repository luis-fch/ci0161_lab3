import { AppTheme } from "../constants/theme";

export interface UseThemeReturn {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: "light" | "dark") => void;
  resetToSystem: () => void;
}
