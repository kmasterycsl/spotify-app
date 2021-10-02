import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorMode, extendTheme, StorageManager } from "native-base";

export const colorModeManager: StorageManager = {
    get: async () => {
        try {
            let val = await AsyncStorage.getItem("@color-mode");
            return val === "dark" ? "dark" : "light";
        } catch (e) {
            return "light";
        }
    },
    set: async (value: ColorMode) => {
        try {
            if (value) {
                await AsyncStorage.setItem("@color-mode", value);
            }
        } catch (e) {
            console.log(e);
        }
    },
};

const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: "#e0ffeb",
            100: "#b8f6cf",
            200: "#8eefb1",
            300: "#63e792",
            400: "#39e074",
            500: "#1fc65a",
            600: "#149a45",
            700: "#096e30",
            800: "#00431b",
            900: "#001804",
        },
    },
    components: {
        Slider: {
            sizes: {
                xs: {
                    thumbSize: 2,
                    sliderSize: 2,
                },
            },
        },
    },
    fonts: {
        heading: "Raleway",
        body: "Raleway",
        mono: "RobotoMono",
    },
    config: {
        initialColorMode: "dark",
    },
    fontConfig: {
        Raleway: {
            300: {
                normal: "Raleway_300Light",
                italic: "Raleway_300Light_Italic",
            },
            400: {
                normal: "Raleway_400Regular",
                italic: "Raleway_400Regular_Italic",
            },
            500: {
                normal: "Raleway_500Medium",
                italic: "Raleway_500Medium_Italic",
            },
            600: {
                normal: "Raleway_600SemiBold",
                italic: "Raleway_600SemiBold_Italic",
            },
        },
    },
});

export default theme;
