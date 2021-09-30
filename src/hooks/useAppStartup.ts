import { useCommonStore } from "@/store/common.store";
import { Query } from "@/types/graphql";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useCustomFonts from "./useCustomFonts";
import useIgnoreLogs from "./useIgnoreLogs";

export const WHOAMI_QUERY = gql`
    query whoAmI {
        whoAmI {
            id
            name
        }
    }
`;

export default function useAppStartup() {
    // useDebugStore();
    useIgnoreLogs();
    const [done, setDone] = useState(false);
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const fontsLoaded = useCustomFonts();
    const {
        data: dataCurrentUser,
        error: errorCurrentUser,
        loading: loadingCurrentUser,
    } = useQuery<Query>(WHOAMI_QUERY, {
        fetchPolicy: "network-only",
    });

    // refresh current user
    useEffect(() => {
        if (!loadingCurrentUser) {
            if (!errorCurrentUser) {
                if (dataCurrentUser) {
                    actionSetCurrentUser(dataCurrentUser.whoAmI);
                }
            } else {
                actionSetCurrentUser();
                actionSetAccessToken();
            }
        }
    }, [loadingCurrentUser, dataCurrentUser, errorCurrentUser]);

    useEffect(() => {
        setDone(!loadingCurrentUser && fontsLoaded);
    }, [loadingCurrentUser, fontsLoaded]);

    return done;
}
