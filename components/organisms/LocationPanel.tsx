import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Radii, Spacing, Typography } from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";
import { PanelHandle } from "../atoms/PanelHandle";
import { SavedLocation } from "./MapContainer";

interface Props {
  orientation: "portrait" | "landscape";
  onClose: () => void;
  onSelectLocation: (location: SavedLocation) => void;
  locations: SavedLocation[];
}

export function LocationPanel({
  orientation,
  onClose,
  onSelectLocation,
  locations,
}: Props) {
  const { theme } = useAppTheme();
  const isPortrait = orientation === "portrait";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        isPortrait ? styles.containerPortrait : styles.containerLandscape,
      ]}
    >
      <Pressable
        onPress={onClose}
        style={[
          styles.header,
          isPortrait ? styles.headerPortrait : styles.headerLandscape,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Close locations panel"
      >
        <PanelHandle orientation="horizontal" />

        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Saved
          </Text>
        </View>
      </Pressable>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {locations.map((location) => (
          <Pressable
            key={location.id}
            style={[
              styles.locationCard,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => onSelectLocation(location)}
          >
            <Text style={[styles.locationName, { color: theme.textPrimary }]}>
              {location.name}
            </Text>
            <Text
              style={[styles.locationCoords, { color: theme.textSecondary }]}
            >
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "transparent",
  },
  containerPortrait: {
    height: 260,
    borderTopWidth: 1,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
  },
  containerLandscape: {
    width: 320,
    borderLeftWidth: 1,
    borderTopLeftRadius: Radii.xl,
    borderBottomLeftRadius: Radii.xl,
  },
  header: {
    alignItems: "center",
  },
  headerPortrait: {
    flexDirection: "column",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.md,
  },
  headerLandscape: {
    flexDirection: "column",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.md,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 0.3,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  locationCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
  },
  locationName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: Typography.sizes.sm,
  },
});
