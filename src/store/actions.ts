import { Dispatch } from "react";
import { Track } from "../types/graphql";
import { AppState } from "./store";

export enum ActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  ADD_TRACK = 'ADD_TRACK',
  ADD_TRACKS = 'ADD_TRACKS',
}

export interface ActionPayloads {
  [ActionTypes.PLAY]: { track: Track };
  [ActionTypes.PAUSE]: {};
  [ActionTypes.RESUME]: {};
  [ActionTypes.ADD_TRACK]: { track: Track };
  [ActionTypes.ADD_TRACKS]: { tracks: Track[] };
}

export interface StoreAction {
  type: ActionTypes,
  payload: ActionPayloads[ActionTypes]
}


export const actionPlay = (dispatch: Dispatch<StoreAction>) => (track: Track) => {
  dispatch({
    type: ActionTypes.PLAY,
    payload: {
      track
    }
  })
}

export const actionPause = (dispatch: Dispatch<StoreAction>) => () => {
  dispatch({
    type: ActionTypes.PAUSE,
    payload: {}
  })
}

export const actionResume = (dispatch: Dispatch<StoreAction>) => () => {
  dispatch({
    type: ActionTypes.RESUME,
    payload: {}
  })
}
