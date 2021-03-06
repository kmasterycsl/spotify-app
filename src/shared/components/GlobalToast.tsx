import { useCommonStore } from "@/store/common.store";
import { useTheme } from "native-base";
import { useEffect } from "react";
import Toast from "react-native-root-toast";

export default function GlobalToast() {
    const toastMessage = useCommonStore(store => store.toastMessage);
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const theme = useTheme();

    useEffect(() => {
        if (toastMessage) {
            const bgColor = theme.colors[toastMessage.status]["600"];
            const textColor = theme.colors.white;

            Toast.show(toastMessage.title, {
                backgroundColor: bgColor,
                duration: 2000,
                textColor,
                position: 0,
            });

            actionSetToastMessage();
        }
    }, [toastMessage]);

    return null;
}
