import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from '../types/graphql';
import create from 'zustand';
import produce from 'immer';
import { IToastProps } from "native-base";
export interface AppState {
    playingIndex?: number,
    playingTrack?: Track,
    soundController?: Audio.Sound;
    soundControllerStatus?: AVPlaybackStatus;
    repeatMode: 'none' | 'once' | 'all',
    tracksQueue: Track[],
    toastMessage?: IToastProps,
    actionPlay: (track: Track) => void,
    actionPause: () => void,
    actionResume: () => void,
    actionUpdatePosition: (position: number) => void,
    actionUpdatePositionPercentage: (percentage: number) => void,
    actionNext: () => void,
}


const useStore = create<AppState>((set, get) => ({
    repeatMode: 'none',
    tracksQueue: [],
    actionPlay: async (track: Track) => {
        const state = get();
        set({ playingTrack: track });

        const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);

        if (trackIndexInQueue > -1) {
            set({ playingIndex: trackIndexInQueue });
        } else {
            set({ tracksQueue: [track] });
            set({ playingIndex: 0 });
        }

        if (state.soundController) {
            console.log('Unload previous sound controller.')
            await state.soundController.unloadAsync();
        }

        try {
            const { sound } = await Audio.Sound.createAsync({
                uri: track.sound.meta.source,
            });

            set({ soundController: sound })

            sound.playAsync();

            sound.setOnPlaybackStatusUpdate((playbackStatus) => {
                set({
                    soundControllerStatus: playbackStatus
                })
                if (playbackStatus.isLoaded) {
                    if (
                        playbackStatus.durationMillis &&
                        playbackStatus.positionMillis >= playbackStatus.durationMillis
                    ) {
                        state.actionNext();
                    }
                }
            });
        } catch (e) {
            set({ toastMessage: { title: "Can't load song", status: 'error' } })
            console.error(e);
        }
    },
    actionNext: () => set(produce<AppState>((state) => {
        const canNext = (state.playingIndex || 0) < state.tracksQueue.length - 1;
        if (canNext) {
            const nextIndex = (state.playingIndex || 0) + 1;
            const nextTrack = state.tracksQueue[nextIndex];
            state.actionPlay(nextTrack);
        } else {
        }
    })),
    actionPause: () => set(produce<AppState>(state => {
        if (state.soundController) {
            state.soundController.pauseAsync();
        }
    })),
    actionResume: () => set(produce<AppState>(state => {
        if (state.soundController) {
            state.soundController.playAsync();
        }
    })),
    actionUpdatePosition: (position: number) => set(produce<AppState>(state => {
        if (state.soundController) {
            state.soundController.setPositionAsync(position);
        }
    })),
    actionUpdatePositionPercentage: (percentage: number) => set(produce<AppState>(state => {
        if (state.soundController && state.soundControllerStatus?.isLoaded) {
            state.soundController.setPositionAsync(percentage * (state.soundControllerStatus.durationMillis || 0));
        }
    })),

}))

export {
    useStore,
}