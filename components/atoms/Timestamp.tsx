import { StyleSheet, Text } from "react-native";
import { Colors, Typography } from "../../constants/theme";

interface Props {
  timestamp: number;
  color?: string;
}

function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

export function Timestamp({ timestamp, color }: Props) {
  return (
    <Text style={[styles.text, color ? { color } : null]}>
      {relativeTime(timestamp)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontFamily: "Sora",
  },
});
