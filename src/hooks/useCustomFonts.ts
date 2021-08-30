import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import {
    RobotoMono_400Regular,
    useFonts,
} from "@expo-google-fonts/roboto-mono";
import { Raleway_400Regular } from '@expo-google-fonts/raleway';

export default function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        RobotoMono: RobotoMono_400Regular,
        Raleway: Raleway_400Regular,
    });

    return fontsLoaded
}