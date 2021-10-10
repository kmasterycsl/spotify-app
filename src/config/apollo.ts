import { useCommonStore } from "@/store/common.store";
import { PaginatedTrack } from "@/types/graphql";
import { ApolloClient, createHttpLink, FieldPolicy, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Constants from "expo-constants";

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

const mergePaginatedResult: FieldPolicy<any> = {
    keyArgs: false,
    // @TODO: extract common paginated object
    merge(existing: PaginatedTrack | undefined, incoming: PaginatedTrack) {
        if (existing?.pageInfo.currentPage === incoming.pageInfo.currentPage) {
            return existing;
        }

        return {
            items: [...(existing?.items || []), ...incoming.items],
            pageInfo: incoming.pageInfo,
        };
    },
};

const apolloCache = new InMemoryCache({
    typePolicies: {
        Artist: {
            fields: {
                tracks: mergePaginatedResult,
            },
        },
        Query: {
            fields: {
                tracks: {
                    ...mergePaginatedResult,
                    keyArgs: ["query"],
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
