export const Colors = {
  background: "#0D1117",
  surface: "#161B22",
  surfaceElevated: "#1C2128",
  border: "#30363D",
  borderSubtle: "#21262D",

  primary: "#2DD4BF",
  primaryDim: "#1A8C7E",
  accent: "#F59E0B",
  accentDim: "#B45309",

  textPrimary: "#F0F6FC",
  textSecondary: "#8B949E",
  textMuted: "#484F58",

  success: "#3FB950",
  danger: "#F85149",
  mapOverlay: "rgba(13,17,23,0.85)",
} as const;

export const Typography = {
  fontPrimary: "Sora",
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
