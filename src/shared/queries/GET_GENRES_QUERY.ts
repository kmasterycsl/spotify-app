import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";

export const GET_GENRES_QUERY = gql`
    ${ImageMetaFragment}
    query getGenres {
        genres {
            id
            name
            coverImage {
                id
                meta {
                    ...ImageMetaFragment
                }
            }
        }
    }
`;
