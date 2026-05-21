import { StyleSheet, Text, View } from "react-native";
import { Radii, Spacing, Typography } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  label: string;
  color?: string;
  textColor?: string;
}

export function Badge({ label, color, textColor }: Props) {
  const { theme } = useAppTheme();
  const resolvedColor = color ?? theme.primary;
  const resolvedTextColor = textColor ?? theme.background;

  return (
    <View style={[styles.badge, { backgroundColor: resolvedColor }]}>
      <Text style={[styles.text, { color: resolvedTextColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
});
