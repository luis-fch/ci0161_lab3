import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  color?: string;
  size?: number;
  pulse?: boolean;
}

export function LocationPin({ color, size = 20, pulse = false }: Props) {
  const { theme } = useAppTheme();
  const resolvedColor = color ?? theme.primary;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!pulse) return;
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.8,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [pulse, pulseAnim, pulseOpacity]);

  return (
    <View style={[styles.container, { width: size * 2, height: size * 2 }]}>
      {pulse && (
        <Animated.View
          style={[
            styles.pulse,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: resolvedColor,
              transform: [{ scale: pulseAnim }],
              opacity: pulseOpacity,
            },
          ]}
        />
      )}
      <View
        style={[
          styles.dot,
          {
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: size,
            backgroundColor: resolvedColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  pulse: { position: "absolute", borderWidth: 2 },
  dot: {},
});
