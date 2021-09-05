import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCommonStore } from "../store/common.store";
import { Query } from "../types/graphql";
import useCustomFonts from "./useCustomFonts";
import useDebugStore from "./useDebugStore";

export const WHOAMI_QUERY = gql`
  query whoAmI {
    whoAmI {
      id
      name
    }
  }
`;

export default function useAppStartup() {
  useDebugStore();
  const [done, setDone] = useState(false);
  const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
  const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
  const fontsLoaded = useCustomFonts();
  const { data: dataCurrentUser, error: errorCurrentUser, loading: loadingCurrentUser } = useQuery<Query>(WHOAMI_QUERY, {
    fetchPolicy: 'network-only'
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