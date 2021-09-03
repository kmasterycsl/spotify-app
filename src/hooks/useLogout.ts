import { useCommonStore } from "../store/common.store";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "../types/graphql";
import { useEffect } from "react";


export default function useLogout() {
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const actionSetToastMessage = useCommonStore(state => state.actionSetToastMessage);

    return () => {
        actionSetCurrentUser();
        actionSetAccessToken();
        actionSetToastMessage({
            title: 'Logout successfully!',
            status: 'info',
        });
    }
}