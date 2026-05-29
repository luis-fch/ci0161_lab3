import { AccelerometerReading } from "./accelerometer";

export interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  acceleration?: AccelerometerReading;
}

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
