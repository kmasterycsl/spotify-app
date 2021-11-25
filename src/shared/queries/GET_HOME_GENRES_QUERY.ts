import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";

export const GET_HOME_GENRES_QUERY = gql`
    ${ImageMetaFragment}
    ${PaginationFragment}
    query getHomeGenres($page: Int = 1, $limit: Int = 10) {
        genres(page: $page, limit: $limit) {
            items {
                id
                name
                playlists(page: $page, limit: $limit) {
                    items {
                        id
                        name
                        coverImage {
                            meta {
                                ...ImageMetaFragment
                            }
                        }
                    }
                    pageInfo {
                        ...PaginationFragment
                    }
                }
                coverImage {
                    id
                    meta {
                        ...ImageMetaFragment
                    }
                }
            }
        }
    }
`;
