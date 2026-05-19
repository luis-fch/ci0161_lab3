import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radii, Spacing, Typography } from "../../constants/theme";
import { SavedLocation } from "../../types/location";
import { CoordinateText } from "./CoordinateText";
import { Timestamp } from "./Timestamp";

interface Props {
  location: SavedLocation;
  index: number;
  onPress?: (loc: SavedLocation) => void;
  onDelete?: (id: string) => void;
}

export function LocationListItem({
  location,
  index,
  onPress,
  onDelete,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();
  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => onPress?.(location)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.row}
        accessibilityRole="button"
      >
        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>
            {(index + 1).toString().padStart(2, "0")}
          </Text>
        </View>
        <View style={styles.info}>
          <CoordinateText
            latitude={location.latitude}
            longitude={location.longitude}
          />
          <Timestamp timestamp={location.timestamp} />
        </View>
        {onDelete && (
          <Pressable
            onPress={() => onDelete(location.id)}
            hitSlop={12}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteText}>✕</Text>
          </Pressable>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    gap: Spacing.sm,
  },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: Radii.sm,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  indexText: {
    fontFamily: "Sora",
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  info: { flex: 1, gap: 2 },
  deleteBtn: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deleteText: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
});
