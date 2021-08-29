import { useEffect } from "react";
import { useStore } from "../store/store";
import shallow from 'zustand/shallow';

export default function useDebugStore() {
    useEffect(() => {
        const unSubscription = useStore.subscribe(
            value => {
                console.log('Store update data: ', value);
            },
            state => [state.tracksQueue, state.playingIndex, state.playingTrack],
            shallow
        );

        return () => unSubscription();
    }, []);
}