import { Sound } from 'expo-av/build/Audio';
import { Track } from '../types/graphql';
import create from 'zustand'

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
}

export const INIT_APP_STATE: AppState = {
    player: INIT_PLAYER_STATE,
    actionPlay: () => {},
    actionPause: () => {},
    actionResume: () => {},
    actionUpdatePosition: () => {},
    actionUpdateTotalDuration: () => {},
}

const useStore = create<AppState>(set => ({
    ...INIT_APP_STATE,
    actionPlay: (track: Track) => {
        set(state => {
            const trackIndexInQueue = state.player.tracksQueue.findIndex(t => t.id === track.id);

            if (trackIndexInQueue > -1) {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        playingState: 'playing',
                        playingIndex: trackIndexInQueue,
                        playingTrack: track,
                    }
                }
            }
            return {
                ...state,
                player: {
                    ...state.player,
                    tracksQueue: [
                        track,
                        ...state.player.tracksQueue
                    ],
                    playingState: 'playing',
                    playingIndex: 0,
                    playingTrack: track,
                }
            }
        })
    },
    actionPause: () => {
        set(state => ({
            ...state,
            player: {
                ...state.player,
                playingState: 'paused',
            }
        }))
    },
    actionResume: () => {
        set(state => ({
            ...state,
            player: {
                ...state.player,
                playingState: 'playing',
            }
        }))
    },
    actionUpdatePosition: (position: number) => {
        set(state => ({
            ...state,
            player: {
                ...state.player,
                playingPosition: position,
            }
        }));
    },
    actionUpdateTotalDuration: (duration: number) => {
        set(state => ({
            ...state,
            player: {
                ...state.player,
                playingTotalDuration: duration,
            }
        }));
    },
}))

export {
    useStore,
}