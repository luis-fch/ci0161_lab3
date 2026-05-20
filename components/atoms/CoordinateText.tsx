import { StyleSheet, Text } from "react-native";
import { Typography } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  latitude: number;
  longitude: number;
  size?: number;
  color?: string;
}

function fmt(val: number, dir: [string, string]) {
  const abs = Math.abs(val);
  const deg = Math.floor(abs);
  const minFull = (abs - deg) * 60;
  const min = Math.floor(minFull);
  const sec = ((minFull - min) * 60).toFixed(1);
  return `${deg}°${min}'${sec}" ${val >= 0 ? dir[0] : dir[1]}`;
}

export function CoordinateText({ latitude, longitude, size, color }: Props) {
  const { theme } = useAppTheme();

  return (
    <Text
      style={[
        styles.text,
        { color: color ?? theme.textSecondary },
        size ? { fontSize: size } : null,
      ]}
      numberOfLines={1}
    >
      {fmt(latitude, ["N", "S"])}
      {"  "}
      {fmt(longitude, ["E", "W"])}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Sora",
    fontSize: Typography.sizes.sm,
    letterSpacing: 0.3,
  },
});
