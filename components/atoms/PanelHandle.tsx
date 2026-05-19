import { StyleSheet, View } from "react-native";
import { Colors, Radii } from "../../constants/theme";

interface Props {
  orientation?: "horizontal" | "vertical";
}

export function PanelHandle({ orientation = "horizontal" }: Props) {
  const isHoriz = orientation === "horizontal";
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.handle,
          isHoriz ? { width: 36, height: 4 } : { width: 4, height: 36 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  handle: { backgroundColor: Colors.border, borderRadius: Radii.full },
});
