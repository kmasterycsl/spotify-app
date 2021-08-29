import { useToast } from "native-base";
import { useEffect } from "react";
import { useStore } from "../../store/store";

export default function GlobalToast() {
  const toast = useToast();
  const toastMessage = useStore((store) => store.toastMessage);

  useEffect(() => {
    if (toastMessage) {
      toast.show({
        duration: 2000,
        variant: "subtle",
        ...toastMessage,
      });
    }
  }, [toastMessage]);

  return null;
}
