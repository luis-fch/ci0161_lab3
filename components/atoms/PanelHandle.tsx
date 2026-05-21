import { StyleSheet, View } from "react-native";
import { Radii } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";

interface Props {
  orientation?: "horizontal" | "vertical";
}

export function PanelHandle({ orientation = "horizontal" }: Props) {
  const { theme } = useAppTheme();
  const isHoriz = orientation === "horizontal";

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.handle,
          { backgroundColor: theme.border },
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
  handle: {
    borderRadius: Radii.full,
  },
});
