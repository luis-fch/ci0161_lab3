import { StyleSheet, Text } from "react-native";
import { Colors, Typography } from "../../constants/theme";

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
  return (
    <Text
      style={[
        styles.text,
        size ? { fontSize: size } : null,
        color ? { color } : null,
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
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
});
