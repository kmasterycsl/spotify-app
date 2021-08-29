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
    actionAddToQueue: (track: Track) => void,
    actionPlay: (track: Track) => void,
    actionPause: () => void,
    actionResume: () => void,
    actionUpdatePosition: (position: number) => void,
    actionUpdatePositionPercentage: (percentage: number) => void,
    actionNext: () => void,
    actionPrev: () => void,
}


const useStore = create<AppState>((set, get) => ({
    repeatMode: 'none',
    tracksQueue: [],
    actionAddToQueue: (track: Track) => set(produce<AppState>(state => {
        const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);
        if (trackIndexInQueue > -1) {
            state.toastMessage = {
                title: 'This song is already in queue',
                status: 'warning',
            }
        } else {
            state.toastMessage = {
                title: 'Added',
                status: 'info',
            }
            state.tracksQueue.push(track);
        }
    })),
    actionPlay: async (track: Track) => {
        const state = get();

        if (state.soundController) {
            console.log('Unload previous sound controller.')
            await state.soundController.unloadAsync();
        }

        const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);

        if (trackIndexInQueue > -1) {
            set({
                playingTrack: track,
                playingIndex: trackIndexInQueue,
            });
        } else {
            set({
                playingTrack: track,
                tracksQueue: [track],
                playingIndex: 0
            });
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
        console.log('actionNext called!');
        const nextIndex = (get().playingIndex || 0) + 1;
        if (nextIndex <= get().tracksQueue.length - 1) {
            state.actionPlay(get().tracksQueue[nextIndex]);
        }

    })),
    actionPrev: () => set(produce<AppState>((state) => {
        const prevIndex = (get().playingIndex || 0) - 1;
        if (prevIndex >= 0) {
            state.actionPlay(get().tracksQueue[prevIndex]);
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