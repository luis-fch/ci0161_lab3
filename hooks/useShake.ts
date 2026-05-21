import { Accelerometer } from "expo-sensors";
import { useEffect, useRef } from "react";

const THRESHOLD = 2; // magnitud del vector de aceleración
const DEBOUNCE_MS = 3000;
const UPDATE_INTERVAL_MS = 100;

export function useShake(onShake: () => void) {
  const onShakeRef = useRef(onShake);
  onShakeRef.current = onShake;

  const lastShakeRef = useRef(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      // Ver: https://openstax.org/books/f%C3%ADsica-universitaria-volumen-1/pages/4-2-vector-de-aceleracion
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude < THRESHOLD) return;

      const now = Date.now();
      if (now - lastShakeRef.current < DEBOUNCE_MS) return;

      lastShakeRef.current = now;
      onShakeRef.current();
    });

    return () => subscription.remove();
  }, []);
}
