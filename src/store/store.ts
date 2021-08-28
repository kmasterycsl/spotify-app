import { Sound } from 'expo-av/build/Audio';
import React from 'react';
import { Track } from '../types/graphql';
import { StoreAction } from './actions';

interface PlayerState {
    playingState: 'idle' | 'playing' | 'paused',
    playingTotalDuration: number,
    playingPosition: number,
    playingIndex?: number,
    playingTrack?: Track,
    player?: Sound,
    repeatMode: 'none' | 'once' | 'all',
    tracksQueue: Track[],
    // _totalQueueTime: number,
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
}

export const INIT_APP_STATE: AppState = {
    player: INIT_PLAYER_STATE,
}


export const AppStateContext = React.createContext<{
    state: AppState,
    dispatch: (action: StoreAction) => any,
}>({
    state: INIT_APP_STATE,
    dispatch: () => { }
});


