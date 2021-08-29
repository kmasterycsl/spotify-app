import { Sound } from 'expo-av/build/Audio';
import { Track } from '../types/graphql';
import create from 'zustand';
import produce from 'immer';

export interface PlayerNativeControllerState {
    soundController?: Sound;
    actionSetSoundController: (controller: Sound) => void,
}

const usePlayerNativeControllerStore = create<PlayerNativeControllerState>(set => ({
    soundController: undefined,
    actionSetSoundController: controller => set({ soundController: controller })
}))

export {
    usePlayerNativeControllerStore,
}