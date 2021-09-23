import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";

export const GET_GENRE_BY_ID_QUERY = gql`
    ${PaginationFragment}
    ${ImageMetaFragment}
    query getGenreById($id: String!, $page: Int!, $limit: Int = 15) {
        genre(id: $id) {
            id
            name
            coverImage {
                id
                meta {
                    ...ImageMetaFragment
                }
            }
            playlists(page: $page, limit: $limit) {
                items {
                    id
                    name
                    coverImage {
                        id
                        meta {
                            ...ImageMetaFragment
                        }
                    }
                }
                pageInfo {
                    ...PaginationFragment
                }
            }
        }
    }
`;
