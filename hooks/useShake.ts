import { useEffect, useRef } from "react";

import { AccelerometerReading } from "../types/accelerometer";

const THRESHOLD = 2; // Magnitude of the acceleration vector
const DEBOUNCE_MS = 3000;

export function useShake(
  { x, y, z }: AccelerometerReading,
  onShake: () => void,
) {
  const onShakeRef = useRef(onShake);
  onShakeRef.current = onShake;

  const lastShakeRef = useRef(0);

  useEffect(() => {
    // See: https://openstax.org/books/f%C3%ADsica-universitaria-volumen-1/pages/4-2-vector-de-aceleracion
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    if (magnitude < THRESHOLD) return;

    const now = Date.now();
    if (now - lastShakeRef.current < DEBOUNCE_MS) return;

    lastShakeRef.current = now;
    onShakeRef.current();
  }, [x, y, z]);
}
