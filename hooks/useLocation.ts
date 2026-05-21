import * as ExpoLocation from "expo-location";
import { useEffect, useRef, useState } from "react";

export interface CurrentLocation {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  heading: number | null;
}

export interface UseLocationResult {
  location: CurrentLocation | null;
  permissionGranted: boolean;
  permissionDenied: boolean;
  loading: boolean;
  error: string | null;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const watchRef = useRef<ExpoLocation.LocationSubscription | null>(null);

  useEffect(() => {
    let mounted = true;

    async function start() {
      try {
        const { status } =
          await ExpoLocation.requestForegroundPermissionsAsync();
        if (!mounted) return;

        if (status !== "granted") {
          setPermissionDenied(true);
          setLoading(false);
          return;
        }

        setPermissionGranted(true);

        const initial = await ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.Highest,
        });
        if (!mounted) return;

        setLocation({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
          accuracy: initial.coords.accuracy,
          heading: initial.coords.heading,
        });
        setLoading(false);

        watchRef.current = await ExpoLocation.watchPositionAsync(
          {
            accuracy: ExpoLocation.Accuracy.Highest,
            timeInterval: 2000,
            distanceInterval: 1,
          },
          (pos) => {
            if (!mounted) return;
            setLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              heading: pos.coords.heading,
            });
          },
        );
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Location error");
        setLoading(false);
      }
    }

    start();
    return () => {
      mounted = false;
      watchRef.current?.remove();
    };
  }, []);

  return { location, permissionGranted, permissionDenied, loading, error };
}
