import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { PaginatedTrack } from "../types/graphql";
import Constants from "expo-constants";
import { setContext } from '@apollo/client/link/context';
import { useCommonStore } from "../store/common.store";

const httpLink = createHttpLink({
  uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = useCommonStore.getState().accessToken;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  }
});

const apolloCache = new InMemoryCache({
  typePolicies: {
    Artist: {
      fields: {
        tracks: {
          keyArgs: false,
          merge(
            existing: PaginatedTrack | undefined,
            incoming: PaginatedTrack
          ) {
            if (existing?.meta.currentPage === incoming.meta.currentPage) {
              return existing;
            }

            return {
              items: [...(existing?.items || []), ...incoming.items],
              meta: incoming.meta,
            };
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
  cache: apolloCache,
});

export {
  apolloClient,
}