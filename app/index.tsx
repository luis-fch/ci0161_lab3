import { useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LocationPanel } from "../components/organisms/LocationPanel";
import { MapContainer } from "../components/organisms/MapContainer";
import { useAppTheme } from "../context/ThemeContext";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useLocation } from "../hooks/useLocation";
import { useOrientation } from "../hooks/useOrientation";
import { useShake } from "../hooks/useShake";
import { SavedLocation } from "../types/location";

const mockLocations: SavedLocation[] = [];

export default function HomeScreen() {
  const { theme, isDark } = useAppTheme();
  const orientation = useOrientation();
  const { location, loading, permissionDenied } = useLocation();
  const acceleration = useAccelerometer();
  const [panelVisible, setPanelVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] =
    useState<SavedLocation | null>(null);
  const [savedLocations, setSavedLocations] =
    useState<SavedLocation[]>(mockLocations);

  const isPortrait = orientation === "portrait";

  const handleShake = () => {
    if (!location) return;
    setSavedLocations((prev) => [
      {
        id: Date.now().toString(),
        name: `Waypoint ${prev.length + 1}`,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: Date.now(),
        acceleration,
      },
      ...prev,
    ]);
  };

  useShake(acceleration, handleShake);

  if (permissionDenied) {
    return (
      <View
        style={[styles.permissionScreen, { backgroundColor: theme.background }]}
      >
        <Text style={styles.permissionIcon}>🗺️</Text>
        <Text style={[styles.permissionTitle, { color: theme.textPrimary }]}>
          Location Access Required
        </Text>
        <Text
          style={[styles.permissionSubtitle, { color: theme.textSecondary }]}
        >
          Enable location permission in Settings to use this app.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.background }]}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <View
        style={[
          styles.layout,
          isPortrait ? styles.layoutPortrait : styles.layoutLandscape,
        ]}
      >
        <MapContainer
          currentLocation={location}
          acceleration={acceleration}
          loading={loading}
          locations={savedLocations}
          selectedLocation={selectedLocation}
          style={styles.map}
        />

        {panelVisible && (
          <LocationPanel
            orientation={orientation}
            onClose={() => setPanelVisible(false)}
            onSelectLocation={setSelectedLocation}
            locations={savedLocations}
          />
        )}

        {!panelVisible && (
          <Pressable
            style={[
              styles.reopenButton,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setPanelVisible(true)}
          >
            <Text
              style={[styles.reopenButtonText, { color: theme.textPrimary }]}
            >
              ☰
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  layoutPortrait: {
    flexDirection: "column",
  },
  layoutLandscape: {
    flexDirection: "row",
  },
  map: {
    flex: 1,
  },
  reopenButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  reopenButtonText: {
    fontSize: 24,
  },
  permissionScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  permissionSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
