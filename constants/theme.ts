export interface AppTheme {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderSubtle: string;
  primary: string;
  primaryDim: string;
  accent: string;
  accentDim: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  danger: string;
  mapOverlay: string;
}

export const darkTheme: AppTheme = {
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
};

export const lightTheme: AppTheme = {
  background: "#FFFFFF",
  surface: "#F6F8FA",
  surfaceElevated: "#EAEEF2",
  border: "#D0D7DE",
  borderSubtle: "#E8ECF0",
  primary: "#0F6E56",
  primaryDim: "#1D9E75",
  accent: "#B45309",
  accentDim: "#854F0B",
  textPrimary: "#1C2128",
  textSecondary: "#57606A",
  textMuted: "#8C959F",
  success: "#1A7F37",
  danger: "#CF222E",
  mapOverlay: "rgba(246,248,250,0.88)",
};

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

export const darkMapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export const lightMapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
