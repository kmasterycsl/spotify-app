import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useCommonStore } from "../store/common.store";
import { Query } from "../types/graphql";
import useCustomFonts from "./useCustomFonts";
import useDebugStore from "./useDebugStore";

const WHOAMI_QUERY = gql`
  query whoAmI {
    whoAmI {
      name
    }
  }
`;

export default function useAppStartup() {
    useDebugStore();
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const fontsLoaded = useCustomFonts();
    const { data: dataCurrentUser, error: errorCurrentUser, loading: loadingCurrentUser } = useQuery<Query>(WHOAMI_QUERY, {});

    // refresh current user
    useEffect(() => {
        if (!loadingCurrentUser) {
            if (!errorCurrentUser) {
                if (dataCurrentUser) {
                    actionSetCurrentUser(dataCurrentUser.whoAmI);
                }
            } else {
                console.warn('Error when load current user: ', errorCurrentUser)
                actionSetCurrentUser();
                actionSetAccessToken();
            }
        }
    }, [loadingCurrentUser, dataCurrentUser, errorCurrentUser]);


    return loadingCurrentUser && fontsLoaded;
}