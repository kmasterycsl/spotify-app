import "dotenv/config";

export default {
    name: "openspotify",
    slug: "openspotify",
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
        bundleIdentifier: "com.kmasteryc.openspotify",
    },
    android: {
        package: "com.kmasteryc.openspotify",
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
        GOOGLE_EXPO_CLIENT_ID: process.env.GOOGLE_EXPO_CLIENT_ID,
        GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
        GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID,
        GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    },
};
