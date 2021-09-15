import { useEffect } from "react";
import { usePlayerStore } from "@/store/player.store";
import shallow from "zustand/shallow";

export default function useDebugStore() {
    useEffect(() => {
        const unSubscription = usePlayerStore.subscribe(
            value => {
                console.log("Store update data: ", value);
            },
            state => [state.tracksQueue, state.playingIndex, state.playingTrack],
            shallow
        );

        return () => unSubscription();
    }, []);
}
