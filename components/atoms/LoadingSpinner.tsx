import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ size = 24, color }: Props) {
  const { theme } = useAppTheme();
  const resolvedColor = color ?? theme.primary;

  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: resolvedColor,
          transform: [{ rotate }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    borderWidth: 2.5,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
});
