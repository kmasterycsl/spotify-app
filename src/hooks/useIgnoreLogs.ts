import { useEffect } from "react";
import { LogBox } from "react-native";

export default function useIgnoreLogs() {
    useEffect(() => {
        LogBox.ignoreLogs([
            'Expected style "lineHeight: 68" to contain units',
            "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
        ]);
    }, []);
}
