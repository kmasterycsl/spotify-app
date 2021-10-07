import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_TRACKS_QUERY = gql`
    ${PaginationFragment}
    ${ImageMetaFragment}
    ${SoundMetaFragment}
    query getTracks($query: String, $page: Int!, $limit: Int = 15) {
        tracks(query: $query, page: $page, limit: $limit) {
            items {
                id
                name
                isLiked
                sound {
                    id
                    meta {
                        ...SoundMetaFragment
                    }
                }
                artists {
                    id
                    name
                }
                album {
                    id
                    coverImage {
                        id
                        meta {
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
