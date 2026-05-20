import { StyleSheet, Text, View } from "react-native";
import { Spacing, Typography } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  title?: string;
  subtitle?: string;
}

export function EmptyState({
  title = "No locations saved",
  subtitle = "Shake the device to save your current position",
}: Props) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📍</Text>
      <Text style={[styles.title, { color: theme.textMuted }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  icon: { fontSize: 32, marginBottom: Spacing.md, opacity: 0.4 },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: "center",
    lineHeight: 18,
    opacity: 0.7,
  },
});
