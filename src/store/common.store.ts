import produce from 'immer';
import create from 'zustand';
import { User } from '../types/graphql';

export interface CommonState {
    currentUser?: User,
    accessToken?: string,
    toastMessage?: {
        title: string,
        status: 'warning' | 'info' | 'error'
    },
    actionSetCurrentUser: (user?: User) => void,
    actionSetAccessToken: (accessToken?: string) => void,
    actionSetToastMessage: (toastMessage?: {
        title: string,
        status: 'warning' | 'info' | 'error'
    }) => void,
}

const useCommonStore = create<CommonState>((set, get) => ({
    actionSetCurrentUser: (user?: User) => set(produce<CommonState>(state => {
        state.currentUser = user;
    })),
    actionSetAccessToken: (accessToken?: string) => set(produce<CommonState>(state => {
        state.accessToken = accessToken;
    })),
    actionSetToastMessage: (toastMessage?: {
        title: string,
        status: 'warning' | 'info' | 'error'
    }) => set(produce<CommonState>(state => {
        state.toastMessage = toastMessage;
    })),
}))

export {
    useCommonStore,
};
