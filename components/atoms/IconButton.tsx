import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Radii } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "filled" | "ghost" | "surface";
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export function IconButton({
  onPress,
  children,
  variant = "surface",
  size = 40,
  style,
  disabled,
  accessibilityLabel,
}: Props) {
  const { theme } = useAppTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();

  const bgColor =
    variant === "filled"
      ? theme.primary
      : variant === "surface"
        ? theme.surfaceElevated
        : "transparent";

  const borderColor = variant === "surface" ? theme.border : "transparent";

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={[
          styles.base,
          {
            width: size,
            height: size,
            borderRadius: Radii.md,
            backgroundColor: bgColor,
            borderColor,
            opacity: disabled ? 0.4 : 1,
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center", borderWidth: 1 },
});
