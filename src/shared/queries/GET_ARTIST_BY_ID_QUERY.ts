import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_ARTIST_BY_ID_QUERY = gql`
    ${PaginationFragment}
    ${ImageMetaFragment}
    ${SoundMetaFragment}
    query getArtistById($id: String!, $page: Int!, $limit: Int = 15) {
        artist(id: $id) {
            id
            isLiked
            name
            isVerified
            biography
            coverImage {
                id
                meta {
                    ...ImageMetaFragment
                }
            }
            avatarImage {
                id
                meta {
                    ... on ImageMeta {
                        ...ImageMetaFragment
                    }
                }
            }
            tracks(page: $page, limit: $limit) {
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
    }
`;
