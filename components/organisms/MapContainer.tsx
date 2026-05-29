import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";

import {
  darkMapStyle,
  lightMapStyle,
  Radii,
  Spacing,
} from "../../constants/theme";
import { useAppTheme } from "../../context/ThemeContext";
import { AccelerometerReading } from "../../types/accelerometer";
import { CurrentLocation, SavedLocation } from "../../types/location";
import { CoordinateText } from "../atoms/CoordinateText";
import { IconButton } from "../atoms/IconButton";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { ThemeToggle } from "../atoms/ThemeToggle";

interface Props {
  currentLocation: CurrentLocation | null;
  acceleration: AccelerometerReading;
  loading: boolean;
  locations: SavedLocation[];
  selectedLocation?: SavedLocation | null;
  style?: object;
}

export function MapContainer({
  currentLocation,
  acceleration,
  loading,
  locations,
  selectedLocation,
  style,
}: Props) {
  const { theme, isDark } = useAppTheme();
  const mapRef = useRef<MapView>(null);

  const centerOnUser = useCallback(() => {
    if (!currentLocation || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      600,
    );
  }, [currentLocation]);

  useEffect(() => {
    if (!currentLocation || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      600,
    );
  }, [currentLocation]);

  useEffect(() => {
    if (!selectedLocation || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      },
      700,
    );
  }, [selectedLocation]);

  const initialRegion: Region = {
    latitude: currentLocation?.latitude ?? 9.9281,
    longitude: currentLocation?.longitude ?? -84.0907,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }, style]}
    >
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="You are here"
          >
            <View style={styles.userMarker} />
          </Marker>
        )}

        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          >
            <View
              style={[styles.savedMarker, { backgroundColor: theme.success }]}
            />
          </Marker>
        ))}
      </MapView>

      {loading && (
        <View
          style={[styles.loadingOverlay, { backgroundColor: theme.background }]}
        >
          <LoadingSpinner size={28} />
        </View>
      )}

      {currentLocation && (
        <View
          style={[
            styles.coordsHud,
            {
              backgroundColor: theme.mapOverlay,
              borderColor: theme.borderSubtle,
            },
          ]}
          pointerEvents="none"
        >
          <CoordinateText
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            size={10}
            color={theme.textSecondary}
          />
          <Text style={[styles.accelText, { color: theme.textSecondary }]}>
            x: {acceleration.x.toFixed(2)} y: {acceleration.y.toFixed(2)} z:{" "}
            {acceleration.z.toFixed(2)} (g)
          </Text>
        </View>
      )}

      <View style={styles.fabContainer}>
        <IconButton
          onPress={centerOnUser}
          variant="surface"
          size={44}
          accessibilityLabel="Center map on my location"
          disabled={!currentLocation}
        >
          <Text style={[styles.fabIcon, { color: theme.textPrimary }]}>◎</Text>
        </IconButton>
        <ThemeToggle />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  coordsHud: {
    position: "absolute",
    bottom: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.sm,
    borderWidth: 1,
  },
  accelText: {
    fontSize: 10,
    fontVariant: ["tabular-nums"],
    marginTop: 2,
  },
  fabContainer: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "column",
    gap: Spacing.sm,
  },
  fabIcon: {
    fontSize: 18,
    lineHeight: 22,
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  savedMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
});
