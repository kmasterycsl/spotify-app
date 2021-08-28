import 'dotenv/config';

export default {
  name: "spotify-app",
  slug: "spotify-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  backgroundColor: "#000000",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.kmasteryc.spotify-app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
};
