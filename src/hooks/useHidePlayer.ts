import { usePlayerStore } from "@/store/player.store";
import { useEffect } from "react";

export default function useHidePlayer() {
    const actionSetPlayerVisible = usePlayerStore(store => store.actionSetPlayerVisible);
    useEffect(() => {
        actionSetPlayerVisible(false);
        return () => {
            actionSetPlayerVisible(true);
        };
    }, []);
}
