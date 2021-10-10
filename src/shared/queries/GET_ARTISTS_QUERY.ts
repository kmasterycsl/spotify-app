import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";

export const GET_ARTISTS_QUERY = gql`
    ${PaginationFragment}
    ${ImageMetaFragment}
    query getArtists($query: String, $page: Int!, $limit: Int = 15) {
        artists(query: $query, page: $page, limit: $limit) {
            items {
                id
                name
                avatarImage {
                    id
                    meta {
                        ... on ImageMeta {
                            ...ImageMetaFragment
                        }
                    }
                }
            }
            pageInfo {
                ...PaginationFragment
            }
        }
    }
`;
