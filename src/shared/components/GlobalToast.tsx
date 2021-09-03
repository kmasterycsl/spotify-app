import { useEffect } from "react";
import Toast from "react-native-root-toast";
import { useTheme } from "native-base";
import { useCommonStore } from "../../store/common.store";

export default function GlobalToast() {
  const toastMessage = useCommonStore((store) => store.toastMessage);
  const theme = useTheme();

  useEffect(() => {
    if (toastMessage) {
      const bgColor = theme.colors[toastMessage.status]["400"];
      const textColor = theme.colors.white;

      Toast.show(toastMessage.title, {
        backgroundColor: bgColor,
        duration: 2000,
        textColor,
      });
    }
  }, [toastMessage]);

  return null;
}
