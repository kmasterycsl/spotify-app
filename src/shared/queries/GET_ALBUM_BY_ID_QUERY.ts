import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_ALBUM_BY_ID_QUERY = gql`
    ${ImageMetaFragment}
    ${SoundMetaFragment}
    query getAlbumById($id: String!) {
        album(id: $id) {
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
            tracks {
                id
                name
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
        }
    }
`;
