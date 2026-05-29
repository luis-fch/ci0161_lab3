import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";
import type { CurrentLocation, UseLocationResult } from "../types/location";

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: ExpoLocation.LocationSubscription | null = null;

    const start = async () => {
      try {
        const { status } =
          await ExpoLocation.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setPermissionDenied(true);
          setLoading(false);
          return;
        }

        setPermissionGranted(true);

        const initial = await ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.Highest,
        });

        setLocation({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
          accuracy: initial.coords.accuracy,
          heading: initial.coords.heading,
        });
        setLoading(false);

        subscription = await ExpoLocation.watchPositionAsync(
          {
            accuracy: ExpoLocation.Accuracy.Highest,
            timeInterval: 2000,
            distanceInterval: 1,
          },
          (pos) => {
            setLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              heading: pos.coords.heading,
            });
          },
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "Location error");
        setLoading(false);
      }
    };

    start();

    return () => subscription?.remove();
  }, []);

  return { location, permissionGranted, permissionDenied, loading, error };
}
