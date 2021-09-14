import { gql } from "@apollo/client";

export const GET_ARTIST_BY_ID_QUERY = gql`
    query getArtistById($id: String!, $page: Int!) {
        artist(id: $id) {
            id
            isLiked
            name
            isVerified
            biography
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
            avatarImage {
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
            tracks(page: $page, limit: 15) {
                items {
                    id
                    name
                    isLiked
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
                meta {
                    itemCount
                    totalItems
                    itemsPerPage
                    totalPages
                    currentPage
                }
            }
        }
    }
`;
