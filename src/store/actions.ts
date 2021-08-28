import { Dispatch } from "react";
import { Track } from "../types/graphql";
import { AppState } from "./store";

export enum ActionTypes {
  PLAY = 'PLAY',
  UPDATE_POSITION = 'UPDATE_POSITION',
  UPDATE_TOTAL_DURATION = 'UPDATE_TOTAL_DURATION',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  ADD_TRACK = 'ADD_TRACK',
  ADD_TRACKS = 'ADD_TRACKS',
}

export interface ActionPayloads {
  [ActionTypes.PLAY]: { track: Track };
  [ActionTypes.UPDATE_POSITION]: { position: number };
  [ActionTypes.UPDATE_TOTAL_DURATION]: { duration: number };
  [ActionTypes.PAUSE]: {};
  [ActionTypes.RESUME]: {};
  [ActionTypes.ADD_TRACK]: { track: Track };
  [ActionTypes.ADD_TRACKS]: { tracks: Track[] };
}

export interface StoreAction {
  type: ActionTypes,
  payload: ActionPayloads[ActionTypes]
}


export const actionPlay = (dispatch: Dispatch<StoreAction>) => async (track: Track) => {
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

export const actionUpdatePosition = (dispatch: Dispatch<StoreAction>) => (position: number) => {
  dispatch({
    type: ActionTypes.UPDATE_POSITION,
    payload: {
      position
    }
  })
}

export const actionUpdateTotalDuration = (dispatch: Dispatch<StoreAction>) => (duration: number) => {
  dispatch({
    type: ActionTypes.UPDATE_TOTAL_DURATION,
    payload: {
      duration
    }
  })
}
