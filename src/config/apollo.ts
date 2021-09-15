import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { PaginatedTrack } from "@/types/graphql";
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";
import { useCommonStore } from "@/store/common.store";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
    const accessToken = useCommonStore.getState().accessToken;

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (operation.operationName === "whoAmI") {
        return;
    }
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code === "UNAUTHENTICATED") {
            }
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });

    if (networkError) {
        useCommonStore.getState().actionSetToastMessage({
            title: `[Network error]: ${networkError}`,
            status: "warning",
        });
        console.log(`[Network error]: ${networkError}`);
    }
});

const apolloCache = new InMemoryCache({
    typePolicies: {
        Artist: {
            fields: {
                tracks: {
                    keyArgs: false,
                    merge(existing: PaginatedTrack | undefined, incoming: PaginatedTrack) {
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
    link: from([errorLink, authLink, httpLink]),
    cache: apolloCache,
});

export { apolloClient };
