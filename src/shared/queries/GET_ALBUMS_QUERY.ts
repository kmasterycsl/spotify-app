import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";

export const GET_ALBUMS_QUERY = gql`
    ${ImageMetaFragment}
    ${PaginationFragment}
    query getAlbums($query: String, $page: Int!, $limit: Int = 15) {
        albums(query: $query, page: $page, limit: $limit) {
            items {
                id
                name
                type
                isLiked
                description
                createdAt
                allArtists {
                    id
                    name
                }
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
`;
