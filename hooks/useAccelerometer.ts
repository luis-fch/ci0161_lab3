import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export interface AccelerometerReading {
  x: number;
  y: number;
  z: number;
}

const UPDATE_INTERVAL_MS = 100;

export function useAccelerometer(): AccelerometerReading {
  const [reading, setReading] = useState<AccelerometerReading>({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      setReading({ x, y, z });
    });

    return () => subscription.remove();
  }, []);

  return reading;
}
