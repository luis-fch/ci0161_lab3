import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";
import { Radii, Spacing } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useAppTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={18}
        color={theme.textPrimary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.sm,
    borderRadius: Radii.md,
    borderWidth: 1,
  },
});
