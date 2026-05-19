import { useCallback, useEffect, useRef } from "react";

import { StyleSheet, Text, View } from "react-native";

import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";

import { Colors, Radii, Spacing } from "../../constants/theme";

import { CurrentLocation } from "../../hooks/useLocation";

import { CoordinateText } from "../atoms/CoordinateText";
import { IconButton } from "../atoms/IconButton";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

export interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  currentLocation: CurrentLocation | null;
  loading: boolean;
  locations: SavedLocation[];
  selectedLocation?: SavedLocation | null;
  style?: object;
}

export function MapContainer({
  currentLocation,
  loading,
  locations,
  selectedLocation,
  style,
}: Props) {
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
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        customMapStyle={darkMapStyle}
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
            <View style={styles.savedMarker} />
          </Marker>
        ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner size={28} />
        </View>
      )}

      {currentLocation && (
        <View style={styles.coordsHud} pointerEvents="none">
          <CoordinateText
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            size={10}
            color={Colors.textSecondary}
          />
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
          <Text style={styles.fabIcon}>◎</Text>
        </IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: "hidden",
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  coordsHud: {
    position: "absolute",
    bottom: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.mapOverlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },

  fabContainer: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
  },

  fabIcon: {
    fontSize: 18,
    color: Colors.textPrimary,
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
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
});

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1a1f2e" }],
  },

  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },

  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },

  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "administrative",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },

  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },

  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },

  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },

  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },

  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
