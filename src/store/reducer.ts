import { StoreAction, ActionTypes, ActionPayloads } from "./actions";
import { AppState } from "./store";

export function rootReducer(state: AppState, action: StoreAction): AppState {
    console.log('ACTION TO STORE: ', action);
    switch (action.type) {
        case ActionTypes.ADD_TRACK:
            return {
                ...state,
                player: {
                    ...state.player,
                    tracksQueue: [
                        ...state.player.tracksQueue,
                        (action.payload as ActionPayloads[ActionTypes.ADD_TRACK]).track
                    ]
                }
            }
        case ActionTypes.ADD_TRACKS:
            return {
                ...state,
                player: {
                    ...state.player,
                    tracksQueue: (action.payload as ActionPayloads[ActionTypes.ADD_TRACKS]).tracks
                }
            }
        case ActionTypes.PLAY:
            const { track } = (action.payload as ActionPayloads[ActionTypes.PLAY])
            const trackIndexInQueue = state.player.tracksQueue.findIndex(t => t.id === track.id);

            if (trackIndexInQueue > -1) {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        playingState: 'playing',
                        playingIndex: trackIndexInQueue
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
                    playingIndex: 0
                }
            }
        case ActionTypes.PAUSE:
            return {
                ...state,
                player: {
                    ...state.player,
                    playingState: 'paused',
                }
            }
        case ActionTypes.RESUME:
            return {
                ...state,
                player: {
                    ...state.player,
                    playingState: 'playing',
                }
            }
        default:
            throw new Error();
    }
}