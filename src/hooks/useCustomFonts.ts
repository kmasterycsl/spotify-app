import { Raleway_300Light, Raleway_300Light_Italic, Raleway_400Regular, Raleway_400Regular_Italic, Raleway_500Medium, Raleway_500Medium_Italic, Raleway_600SemiBold, Raleway_600SemiBold_Italic } from "@expo-google-fonts/raleway";
import { RobotoMono_400Regular, useFonts } from "@expo-google-fonts/roboto-mono";

export default function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        RobotoMono: RobotoMono_400Regular,
        Raleway_300Light: Raleway_300Light,
        Raleway_300Light_Italic: Raleway_300Light_Italic,
        Raleway_400Regular: Raleway_400Regular,
        Raleway_400Regular_Italic: Raleway_400Regular_Italic,
        Raleway_500Medium: Raleway_500Medium,
        Raleway_500Medium_Italic: Raleway_500Medium_Italic,
        Raleway_600SemiBold: Raleway_600SemiBold,
        Raleway_600SemiBold_Italic: Raleway_600SemiBold_Italic,
    });

    return fontsLoaded;
}
