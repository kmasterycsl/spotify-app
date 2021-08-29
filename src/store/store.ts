import { Sound } from 'expo-av/build/Audio';
import { Track } from '../types/graphql';
import create from 'zustand';
import produce from 'immer';
interface PlayerState {
    playingState: 'idle' | 'playing' | 'paused',
    playingTotalDuration: number,
    playingPosition: number,
    playingIndex?: number,
    playingTrack?: Track,
    player?: Sound,
    repeatMode: 'none' | 'once' | 'all',
    tracksQueue: Track[],
}

const INIT_PLAYER_STATE: PlayerState = {
    playingState: 'idle',
    playingTotalDuration: 0,
    playingPosition: 0,
    playingIndex: undefined,
    playingTrack: undefined,
    player: undefined,
    repeatMode: 'none',
    tracksQueue: [],
}

export interface AppState {
    player: PlayerState,
    actionPlay: (track: Track) => void,
    actionPause: () => void,
    actionResume: () => void,
    actionUpdatePosition: (position: number) => void,
    actionUpdateTotalDuration: (duration: number) => void,
    actionNext: () => void,
}

export const INIT_APP_STATE: AppState = {
    player: INIT_PLAYER_STATE,
    actionPlay: () => { },
    actionPause: () => { },
    actionResume: () => { },
    actionUpdatePosition: () => { },
    actionUpdateTotalDuration: () => { },
    actionNext: () => { },
}

const useStore = create<AppState>(set => ({
    ...INIT_APP_STATE,
    actionPlay: (track: Track) => set(produce<AppState>((state) => {
        state.player.playingState = 'playing';
        state.player.playingTrack = track;
        state.player.playingTotalDuration = 0;
        state.player.playingPosition = 0;

        const trackIndexInQueue = state.player.tracksQueue.findIndex(t => t.id === track.id);

        if (trackIndexInQueue > -1) {
            state.player.playingIndex = trackIndexInQueue;
        } else {
            state.player.tracksQueue.unshift(track);
            state.player.playingIndex = 0;
        }
    })),
    actionNext: () => set(produce<AppState>((state) => {
        const canNext = (state.player.playingIndex || 0) < state.player.tracksQueue.length - 1;
        if (canNext) {
            const nextIndex = (state.player.playingIndex || 0) + 1;
            state.player.playingTotalDuration = 0;
            state.player.playingPosition = 0;
            state.player.playingState = 'playing';
            state.player.playingIndex = nextIndex;
            state.player.playingTrack = state.player.tracksQueue[nextIndex];
        } else {
            state.player.playingState = 'paused';
        }
    })),
    actionPause: () => set(produce<AppState>(state => {
        state.player.playingState = 'paused';
    })),
    actionResume: () => set(produce<AppState>(state => {
        state.player.playingState = 'playing';
    })),
    actionUpdatePosition: (position: number) => set(produce<AppState>(state => {
        state.player.playingPosition = position;
    })),
    actionUpdateTotalDuration: (duration: number) => set(produce<AppState>(state => {
        state.player.playingTotalDuration = duration;
    })),
}))

export {
    useStore,
}