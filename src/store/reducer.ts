import { StoreAction, ActionTypes, ActionPayloads } from "./actions";
import { AppState } from "./store";

const IGNORE_LOG_TYPES = [
    ActionTypes.UPDATE_POSITION,
]

export function rootReducer(state: AppState, action: StoreAction): AppState {
    if (!IGNORE_LOG_TYPES.includes(action.type)) {
        console.log('ACTION TO STORE: ', action);
    }
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
        case ActionTypes.UPDATE_POSITION:
            const { position } = (action.payload as ActionPayloads[ActionTypes.UPDATE_POSITION])
            return {
                ...state,
                player: {
                    ...state.player,
                    playingPosition: position,
                }
            }
        case ActionTypes.UPDATE_TOTAL_DURATION:
            const { duration } = (action.payload as ActionPayloads[ActionTypes.UPDATE_TOTAL_DURATION])
            return {
                ...state,
                player: {
                    ...state.player,
                    playingTotalDuration: duration,
                }
            }
        default:
            throw new Error('Unsupport dispatch action. Check again!');
    }
}