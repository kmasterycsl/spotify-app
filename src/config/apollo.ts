import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedTrack } from "../types/graphql";
import Constants from "expo-constants";

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
    uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
    cache: apolloCache,
  });

  export {
    apolloClient,
  }