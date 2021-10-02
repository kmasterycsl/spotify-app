import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";

export const GET_GENRES_QUERY = gql`
    ${ImageMetaFragment}
    ${PaginationFragment}
    query getGenres($page: Int!, $limit: Int = 15) {
        genres(page: $page, limit: $limit) {
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
`;
