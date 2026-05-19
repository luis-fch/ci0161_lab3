
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors, Radii, Spacing, Typography } from "../../constants/theme";

import { SavedLocation } from "./MapContainer";

import { PanelHandle } from "../atoms/PanelHandle";

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
  const isPortrait = orientation === "portrait";

  return (
    <View
      style={[
        styles.container,
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
        <PanelHandle orientation={isPortrait ? "horizontal" : "vertical"} />

        <View style={styles.headerContent}>
          <Text style={styles.title}>Saved</Text>
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
            style={styles.locationCard}
            onPress={() => onSelectLocation(location)}
          >
            <Text style={styles.locationName}>{location.name}</Text>

            <Text style={styles.locationCoords}>
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
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
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
    color: Colors.textPrimary,
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
    backgroundColor: Colors.background,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  locationName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    marginBottom: 4,
  },

  locationCoords: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
});
