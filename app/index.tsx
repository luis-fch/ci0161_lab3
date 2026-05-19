import { useEffect, useState } from "react";

import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocation } from "../hooks/useLocation";

import { useOrientation } from "../hooks/useOrientation";

import { LocationPanel } from "../components/organisms/LocationPanel";

import {
  MapContainer,
  SavedLocation,
} from "../components/organisms/MapContainer";

import { Colors } from "../constants/theme";

// Mock data for saved locations - replace with real data source as needed
const mockLocations: SavedLocation[] = [
  {
    id: "1",
    name: "Test 1",
    latitude: 9.9414,
    longitude: -84.0459,
  },

  {
    id: "2",
    name: "Test 2",
    latitude: 9.9333,
    longitude: -84.0833,
  },

  {
    id: "3",
    name: "Test 3",
    latitude: 9.9281,
    longitude: -84.0907,
  },

  {
    id: "4",
    name: "Test 4",
    latitude: 9.9272,
    longitude: -84.0798,
  },

  {
    id: "5",
    name: "Test 5",
    latitude: 9.9272,
    longitude: -84.07,
  },

  {
    id: "6",
    name: "Test 6",
    latitude: 9.9272,
    longitude: -84.074,
  },
];

export default function HomeScreen() {
  const orientation = useOrientation();

  const { location, loading, permissionDenied } = useLocation();

  const [panelVisible, setPanelVisible] = useState(true);

  const [selectedLocation, setSelectedLocation] =
    useState<SavedLocation | null>(null);

  const isPortrait = orientation === "portrait";

  useEffect(() => {
    console.log("orientation", orientation);
  }, [orientation]);

  if (permissionDenied) {
    return (
      <View style={styles.permissionScreen}>
        <Text style={styles.permissionIcon}>🗺️</Text>

        <Text style={styles.permissionTitle}>Location Access Required</Text>

        <Text style={styles.permissionSubtitle}>
          Enable location permission in Settings to use this app.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View
        style={[
          styles.layout,
          isPortrait ? styles.layoutPortrait : styles.layoutLandscape,
        ]}
      >
        <MapContainer
          currentLocation={location}
          loading={loading}
          locations={mockLocations}
          selectedLocation={selectedLocation}
          style={styles.map}
        />

        {panelVisible && (
          <LocationPanel
            orientation={orientation}
            onClose={() => setPanelVisible(false)}
            onSelectLocation={setSelectedLocation}
            locations={mockLocations}
          />
        )}

        {!panelVisible && (
          <Pressable
            style={styles.reopenButton}
            onPress={() => setPanelVisible(true)}
          >
            <Text style={styles.reopenButtonText}>☰</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  reopenButtonText: {
    fontSize: 24,
    color: Colors.textPrimary,
  },

  permissionScreen: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },

  permissionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
