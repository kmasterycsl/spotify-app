import { gql } from "@apollo/client";

export const GET_ALBUM_BY_ID_QUERY = gql`
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
                    ... on ImageMeta {
                        source
                        width
                        height
                        dominantColor
                    }
                }
            }
            tracks {
                id
                name
                sound {
                    id
                    meta {
                        ... on SoundMeta {
                            source
                            length
                        }
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
                            ... on ImageMeta {
                                source
                                width
                                height
                            }
                        }
                    }
                }
            }
        }
    }
`;
