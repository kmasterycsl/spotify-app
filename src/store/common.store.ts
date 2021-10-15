import { User } from "@/types/graphql";
import storage from "@/utils/storage";
import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";

export interface CommonState {
    currentUser?: User;
    accessToken?: string;
    toastMessage?: {
        title: string;
        status: "warning" | "info" | "error";
    };
    bottomTabHeight: number;
    actionSetCurrentUser: (user?: User) => void;
    actionSetAccessToken: (accessToken?: string) => void;
    actionSetToastMessage: (toastMessage?: {
        title: string;
        status: "warning" | "info" | "error";
    }) => void;
    actionSetBottomTabHeight: (height: number) => void;
}

const useCommonStore = create<CommonState>(
    persist(
        (set, get) => ({
            bottomTabHeight: 50,
            actionSetCurrentUser: (user?: User) =>
                set(
                    produce<CommonState>(state => {
                        state.currentUser = user;
                    })
                ),
            actionSetAccessToken: (accessToken?: string) =>
                set(
                    produce<CommonState>(state => {
                        state.accessToken = accessToken;
                    })
                ),
            actionSetToastMessage: (toastMessage?: {
                title: string;
                status: "warning" | "info" | "error";
            }) =>
                set(
                    produce<CommonState>(state => {
                        state.toastMessage = toastMessage;
                    })
                ),
            actionSetBottomTabHeight: (height) =>
                set(
                    produce<CommonState>(state => {
                        state.bottomTabHeight = height;
                    })
                ),
        }),
        {
            name: "@common-store",
            getStorage: () => storage,
        }
    )
);

export { useCommonStore };
