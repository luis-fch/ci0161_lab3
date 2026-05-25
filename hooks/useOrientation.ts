import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export type Orientation = "portrait" | "landscape";

const getOrientation = (): Orientation => {
  const { width, height } = Dimensions.get("window");
  return width < height ? "portrait" : "landscape";
};

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      setOrientation(getOrientation());
    });
    return () => subscription.remove();
  }, []);

  return orientation;
}
