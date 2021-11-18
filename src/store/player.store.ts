import { Album, Track } from "@/types/graphql";
import { Audio, AVPlaybackStatus } from "expo-av";
import produce from "immer";
import _shuffle from "lodash.shuffle";
import create from "zustand";
import { useCommonStore } from "./common.store";
const commonStoreState = useCommonStore.getState();

export interface PlayerState {
    playingIndex?: number;
    playingTrack?: Track;
    playingAlbumId?: string;
    playingArtistId?: string;
    playingPlaylistId?: string;
    soundController?: Audio.Sound;
    soundControllerStatus?: AVPlaybackStatus;
    shuffle: boolean;
    repeatMode: "none" | "once" | "all";
    tracksQueue: Track[];
    isPlayerVisible: () => boolean;
    actionBulkAddToQueue: (tracks: Track[]) => void;
    actionAddToQueue: (track: Track) => void;
    actionRemoveFromQueue: (track: Track) => void;
    actionPlay: (track: Track) => void;
    actionPlayAlbum: (album: Album) => void;
    actionPlayArtist: (artistId: string, tracks: Track[]) => void;
    actionPlayPlaylist: (playlistId: string, tracks: Track[]) => void;
    actionUpdateQueue: (queue: Track[]) => void;
    actionPause: () => void;
    actionResume: () => void;
    actionToggleShuffleMode: () => void;
    actionToggleRepeatMode: () => void;
    actionUpdatePosition: (position: number) => void;
    actionUpdatePositionPercentage: (percentage: number) => void;
    actionNext: () => void;
    actionNextWithCheckRepeatMode: () => void;
    actionPrev: () => void;
}

const UPDATE_INTERVAL = 1000;
const ENDING_CAP = 0.995;

const usePlayerStore = create<PlayerState>((set, get) => ({
    repeatMode: "none",
    shuffle: false,
    tracksQueue: [],
    isPlayerVisible: () => {
        return !!get().playingTrack;
    },
    actionAddToQueue: (track: Track) =>
        set(
            produce<PlayerState>(state => {
                const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);
                if (trackIndexInQueue > -1) {
                    commonStoreState.actionSetToastMessage({
                        title: "This song is already in queue",
                        status: "warning",
                    });
                } else {
                    commonStoreState.actionSetToastMessage({
                        title: "Added",
                        status: "info",
                    });
                    state.tracksQueue.push(track);
                }
            })
        ),
    actionBulkAddToQueue: (tracks: Track[]) =>
        set(
            produce<PlayerState>(state => {
                // @TODO: improve algo
                const currentKeys = get().tracksQueue.map(t => t.id);
                const pendindTracksToAdd = tracks.filter(t => !currentKeys.includes(t.id));
                state.tracksQueue.push(...pendindTracksToAdd);
            })
        ),
    actionRemoveFromQueue: (track: Track) =>
        set(
            produce<PlayerState>(state => {
                const trackIndexInQueue = state.tracksQueue.findIndex(t => t.id === track.id);
                if (trackIndexInQueue > -1) {
                    state.tracksQueue.splice(trackIndexInQueue, 1);
                    commonStoreState.actionSetToastMessage({
                        title: "Removed",
                        status: "info",
                    });
                } else {
                    commonStoreState.actionSetToastMessage({
                        title: "This song is not in queue",
                        status: "warning",
                    });
                }
            })
        ),
    actionPlay: async (track: Track) => {
        const state = get();

        set({
            soundControllerStatus: {
                isLoaded: true,
                uri: "",
                progressUpdateIntervalMillis: 500,
                positionMillis: 0,
                shouldPlay: true,
                isPlaying: true,
                isBuffering: false,
                rate: 1,
                shouldCorrectPitch: true,
                volume: 10,
                isMuted: false,
                isLooping: false,
                didJustFinish: false,
            },
        });

        // Replay manually
        if (track.id === state.playingTrack?.id) {
            if (state.soundController) {
                await state.soundController.setPositionAsync(0);
            }
            return;
        }

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
                playingIndex: 0,
            });
        }

        try {
            const { sound } = await Audio.Sound.createAsync({
                uri: track.sound.meta.source,
            });

            set({ soundController: sound });

            sound.playAsync();

            sound.setProgressUpdateIntervalAsync(UPDATE_INTERVAL);

            sound.setOnPlaybackStatusUpdate(playbackStatus => {
                set({
                    soundControllerStatus: playbackStatus,
                });
                if (playbackStatus.isLoaded) {
                    if (
                        playbackStatus.durationMillis &&
                        playbackStatus.positionMillis >= playbackStatus.durationMillis * ENDING_CAP
                    ) {
                        state.actionNextWithCheckRepeatMode();
                    }
                }
            });
        } catch (e) {
            commonStoreState.actionSetToastMessage({
                title: "Can't load song",
                status: "error",
            });
            console.error(e);
        }
    },
    actionPlayAlbum: async (album: Album) => {
        const state = get();

        // re-play same album
        if (album.id === state.playingAlbumId) {
            state.actionResume();
        } else {
            // play new album
            if (state.soundController) {
                await state.soundController.unloadAsync();
            }

            set({
                playingAlbumId: album.id,
                tracksQueue: album.tracks,
            });

            state.actionPlay(album.tracks[0]);
        }
    },
    actionPlayArtist: async (artistId: string, tracks: Track[]) => {
        const state = get();

        // re-play same artist
        if (artistId === state.playingArtistId) {
            state.actionResume();
        } else {
            // play new artist
            if (state.soundController) {
                await state.soundController.unloadAsync();
            }

            set({
                playingArtistId: artistId,
                tracksQueue: tracks,
            });

            state.actionPlay(tracks[0]);
        }
    },
    actionPlayPlaylist: async (playlistId: string, tracks: Track[]) => {
        const state = get();

        // re-play same artist
        if (playlistId === state.playingPlaylistId) {
            state.actionResume();
        } else {
            if (tracks.length > 0) {
                // play new artist
                if (state.soundController) {
                    await state.soundController.unloadAsync();
                }

                set({
                    playingPlaylistId: playlistId,
                    tracksQueue: tracks,
                });

                state.actionPlay(tracks[0]);
            }
        }
    },
    actionUpdateQueue: (tracks: Track[]) =>
        set(
            produce<PlayerState>(state => {
                state.tracksQueue = tracks;
                const trackIndexInQueue = state.tracksQueue.findIndex(
                    t => t.id === get().playingTrack?.id
                );
                state.playingIndex = trackIndexInQueue;
            })
        ),
    actionNext: () =>
        set(
            produce<PlayerState>(state => {
                const nextIndex = (get().playingIndex || 0) + 1;

                if (nextIndex !== undefined && nextIndex <= get().tracksQueue.length - 1) {
                    state.actionPlay(get().tracksQueue[nextIndex]);
                }
            })
        ),
    actionNextWithCheckRepeatMode: () =>
        set(
            produce<PlayerState>(state => {
                let nextIndex;
                if (state.repeatMode === "none") {
                    nextIndex = (get().playingIndex || 0) + 1;
                } else if (state.repeatMode === "once") {
                    nextIndex = get().playingIndex || 0;
                    state.actionUpdatePosition(0);
                } else if (state.repeatMode === "all") {
                    nextIndex = 0;
                }

                if (nextIndex !== undefined && nextIndex <= get().tracksQueue.length - 1) {
                    state.actionPlay(get().tracksQueue[nextIndex]);
                }
            })
        ),
    actionPrev: () =>
        set(
            produce<PlayerState>(state => {
                const prevIndex = (get().playingIndex || 0) - 1;
                if (prevIndex >= 0) {
                    state.actionPlay(get().tracksQueue[prevIndex]);
                }
            })
        ),
    actionPause: () =>
        set(
            produce<PlayerState>(state => {
                if (state.soundController) {
                    state.soundController.pauseAsync();
                }
            })
        ),
    actionResume: () =>
        set(
            produce<PlayerState>(state => {
                if (state.soundController) {
                    // resume when songs end -> play from start
                    if (
                        state.soundControllerStatus?.isLoaded &&
                        !state.soundControllerStatus.isPlaying &&
                        state.soundControllerStatus.durationMillis &&
                        state.soundControllerStatus.positionMillis >=
                            state.soundControllerStatus.durationMillis * ENDING_CAP
                    ) {
                        state.soundController.setPositionAsync(0);
                    }
                    state.soundController.playAsync();
                }
            })
        ),
    actionUpdatePosition: (position: number) =>
        set(
            produce<PlayerState>(state => {
                if (state.soundController) {
                    state.soundController.setPositionAsync(position);
                }
            })
        ),
    actionToggleShuffleMode: () =>
        set(
            produce<PlayerState>(state => {
                state.shuffle = !state.shuffle;
                if (state.shuffle) {
                    state.tracksQueue = _shuffle(state.tracksQueue);
                    if (state.playingTrack) {
                        state.playingIndex = state.tracksQueue.findIndex(
                            t => t.id === state.playingTrack!.id
                        );
                    }
                }
            })
        ),
    actionToggleRepeatMode: () =>
        set(
            produce<PlayerState>(state => {
                if (state.repeatMode === "none") {
                    state.repeatMode = "once";
                } else if (state.repeatMode === "once") {
                    state.repeatMode = "all";
                } else if (state.repeatMode === "all") {
                    state.repeatMode = "none";
                }
            })
        ),
    actionUpdatePositionPercentage: (percentage: number) =>
        set(
            produce<PlayerState>(state => {
                if (state.soundController && state.soundControllerStatus?.isLoaded) {
                    state.soundController.setPositionAsync(
                        percentage * (state.soundControllerStatus.durationMillis || 0)
                    );
                }
            })
        ),
}));

export { usePlayerStore };
