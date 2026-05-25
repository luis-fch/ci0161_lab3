import { AccelerometerReading } from "../hooks/useAccelerometer";

export interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  acceleration?: AccelerometerReading;
}
