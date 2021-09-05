import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from '../types/graphql';
import create from 'zustand';
import produce from 'immer';
import _shuffle from 'lodash.shuffle';
import { useCommonStore } from "./common.store";
const commonStoreState = useCommonStore.getState();

export interface PlayerState {
    playingIndex?: number,
    playingTrack?: Track,
    soundController?: Audio.Sound;
    soundControllerStatus?: AVPlaybackStatus;
    shuffle: boolean,
    repeatMode: 'none' | 'once' | 'all',
    tracksQueue: Track[],
    actionAddToQueue: (track: Track) => void,
    actionRemoveFromQueue: (track: Track) => void,
    actionPlay: (track: Track) => void,
    actionPause: () => void,
    actionResume: () => void,
    actionToggleShuffleMode: () => void,
    actionUpdatePosition: (position: number) => void,
    actionUpdatePositionPercentage: (percentage: number) => void,
    actionNext: () => void,
    actionPrev: () => void,
}

const UPDATE_INTERVAL = 1000;
const ENDING_CAP = 0.999;

const usePlayerStore = create<PlayerState>((set, get) => ({
    repeatMode: 'none',
    shuffle: false,
    tracksQueue: [],
    actionAddToQueue: (track: Track) => set(produce<PlayerState>(state => {
        const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);
        if (trackIndexInQueue > -1) {
            commonStoreState.actionSetToastMessage({
                title: 'This song is already in queue',
                status: 'warning',
            })
        } else {
            commonStoreState.actionSetToastMessage({
                title: 'Added',
                status: 'info',
            });
            state.tracksQueue.push(track);
        }
    })),
    actionRemoveFromQueue: (track: Track) => set(produce<PlayerState>(state => {
        const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);
        if (trackIndexInQueue > -1) {
            state.tracksQueue.splice(trackIndexInQueue, 1);
            commonStoreState.actionSetToastMessage({
                title: 'Removed',
                status: 'info',
            });
        } else {
            commonStoreState.actionSetToastMessage({
                title: 'This song is not in queue',
                status: 'warning',
            });
        }
    })),
    actionPlay: async (track: Track) => {
        const state = get();

        if (state.soundController) {
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

            sound.setProgressUpdateIntervalAsync(UPDATE_INTERVAL);

            sound.setOnPlaybackStatusUpdate((playbackStatus) => {
                set({
                    soundControllerStatus: playbackStatus
                })
                if (playbackStatus.isLoaded) {
                    if (
                        playbackStatus.durationMillis &&
                        playbackStatus.positionMillis >= playbackStatus.durationMillis * ENDING_CAP
                    ) {
                        state.actionNext();
                    }
                }
            });
        } catch (e) {
            commonStoreState.actionSetToastMessage({
                title: "Can't load song",
                status: 'error'
            });
            console.error(e);
        }
    },
    actionNext: () => set(produce<PlayerState>((state) => {
        const nextIndex = (get().playingIndex || 0) + 1;
        if (nextIndex <= get().tracksQueue.length - 1) {
            state.actionPlay(get().tracksQueue[nextIndex]);
        }

    })),
    actionPrev: () => set(produce<PlayerState>((state) => {
        const prevIndex = (get().playingIndex || 0) - 1;
        if (prevIndex >= 0) {
            state.actionPlay(get().tracksQueue[prevIndex]);
        }
    })),
    actionPause: () => set(produce<PlayerState>(state => {
        if (state.soundController) {
            state.soundController.pauseAsync();
        }
    })),
    actionResume: () => set(produce<PlayerState>(state => {
        if (state.soundController) {
            state.soundController.playAsync();
        }
    })),
    actionUpdatePosition: (position: number) => set(produce<PlayerState>(state => {
        if (state.soundController) {
            state.soundController.setPositionAsync(position);
        }
    })),
    actionToggleShuffleMode: () => set(produce<PlayerState>(state => {
        state.shuffle = !state.shuffle;
        if (state.shuffle) {
            state.tracksQueue = _shuffle(state.tracksQueue);
            if (state.playingTrack) {
                state.playingIndex = state.tracksQueue.findIndex(t => t.id === state.playingTrack!.id);
            }
        }
    })),
    actionUpdatePositionPercentage: (percentage: number) => set(produce<PlayerState>(state => {
        if (state.soundController && state.soundControllerStatus?.isLoaded) {
            state.soundController.setPositionAsync(percentage * (state.soundControllerStatus.durationMillis || 0));
        }
    })),

}))

export {
    usePlayerStore,
}