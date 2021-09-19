import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_PLAYLIST_BY_ID_QUERY = gql`
    ${PaginationFragment}
    ${SoundMetaFragment}
    ${ImageMetaFragment}
    query getPlaylistById($id: String!, $page: Int!, $limit: Int = 15) {
        playlist(id: $id) {
            id
            name
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
