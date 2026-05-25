# Lab 3

A React Native map app built with Expo that saves with a shake and displays locations, with support for light and dark themes.

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bunx expo start
   ```

## Types

### `SavedLocation`

Defined in `types/location.ts`. Represents a location saved by the user.

| Field          | Type                   | Required | Description                                          |
| -------------- | ---------------------- | -------- | ---------------------------------------------------- |
| `id`           | `string`               | yes      | Unique identifier                                    |
| `name`         | `string`               | yes      | Display name shown in the locations panel            |
| `latitude`     | `number`               | yes      | Latitude coordinate                                  |
| `longitude`    | `number`               | yes      | Longitude coordinate                                 |
| `timestamp`    | `number`               | yes      | Unix timestamp of when it was saved                  |
| `acceleration` | `AccelerometerReading` | no       | x/y/z accelerometer reading (g) at the shake instant |

## Component structure

```
components/
├── atoms/          # Small, self-contained UI primitives
│   ├── Badge           # Pill-shaped colored label
│   ├── CoordinateText  # Formats lat/long into DMS notation
│   ├── EmptyState      # Centered icon + message for empty lists
│   ├── IconButton      # Pressable button with spring animation
│   ├── LoadingSpinner  # Animated rotating ring
│   ├── LocationPin     # Map marker dot with optional pulse ring
│   ├── PanelHandle     # Drag indicator bar for bottom sheet
│   ├── ThemeToggle     # Sun/moon icon button to switch themes
│   └── Timestamp       # Converts Unix timestamp to relative time
│
└── organisms/      # Complex components composed of atoms
    ├── LocationPanel   # Scrollable saved locations bottom sheet,
    │                   # adapts layout for portrait and landscape
    └── MapContainer    # Live map with user marker, saved location
                        # markers, FAB controls, and coordinate HUD
```

## Theming

The app supports light and dark mode via a custom `useTheme` hook and React Context.

- Theme follows the device OS setting by default
- Can be overridden manually using the toggle button on the map
- All colors are defined in `constants/theme.ts` as `lightTheme` and `darkTheme`, both typed against the `AppTheme` interface
- Components access the current theme via `useAppTheme()` from `context/ThemeContext`
- The map uses a custom dark style in dark mode and the default Google Maps style in light mode, with POI, transit, and road labels hidden in both
