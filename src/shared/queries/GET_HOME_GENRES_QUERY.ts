import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";

export const GET_HOME_GENRES_QUERY = gql`
    ${ImageMetaFragment}
    query getHomeGenres($page: Int = 1, $limit: Int = 10) {
        genres {
            id
            name
            playlists(page: $page, limit: $limit) {
                items {
                    id
                    name
                    coverImage {
                        meta {
                            ...ImageMetaFragment
                        }
                    }
                }
            }
            coverImage {
                id
                meta {
                    ...ImageMetaFragment
                }
            }
        }
    }
`;
