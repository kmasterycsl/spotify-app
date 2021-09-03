import { useCommonStore } from "../store/common.store";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "../types/graphql";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

const LOGIN_GOOGLE_MUTATION = gql`
    mutation loginBySocialProvider($idToken: String!, $providerId: String!) {
        loginBySocialProvider(idToken: $idToken, providerId: $providerId) {
            user {
                id
                name
            }
            accessToken
        }
    }
`;

export default function useLoginByGoogle() {
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const actionSetToastMessage = useCommonStore(state => state.actionSetToastMessage);
    const [loginByGoogle, { data, error }] = useMutation<Mutation>(LOGIN_GOOGLE_MUTATION);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
        iosClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
        androidClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
        webClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
        responseType: ResponseType.IdToken,
    });

    useEffect(() => {
        if (response?.type === "success") {
            loginByGoogle({
                variables: {
                    idToken: response.params.id_token,
                    providerId: 'GOOGLE',
                }
            });
        }
    }, [response]);

    useEffect(() => {
        if (!error) {
            if (data) {
                actionSetCurrentUser(data.loginBySocialProvider.user);
                actionSetAccessToken(data.loginBySocialProvider.accessToken);
                actionSetToastMessage({ title: 'Login successfully.', status: 'info' })
            }
        } else {
            actionSetToastMessage({ title: error.message, status: 'error' })
        }
    }, [data, error]);

    return {
        request,
        response,
        promptAsync
    }
}
