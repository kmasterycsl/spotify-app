import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import {
    RobotoMono_400Regular,
    useFonts,
} from "@expo-google-fonts/roboto-mono";

export default function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        RobotoMono: RobotoMono_400Regular,
        Roboto: Roboto_400Regular,
    });

    return fontsLoaded
}