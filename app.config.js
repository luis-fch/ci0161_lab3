import "dotenv/config";

//console.log("GOOGLE MAPS KEY:", process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

export default {
  expo: {
    name: "ci0161_lab3",
    slug: "ci0161_lab3",
    version: "1.0.0",

    icon: "./assets/images/icon.png",

    scheme: "ci0161lab3",

    userInterfaceStyle: "automatic",

    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.anonymous.ci0161_lab3",

      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },

      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,

      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",

      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",

          dark: {
            backgroundColor: "#000000",
          },
        },
      ],

      "expo-font",
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
