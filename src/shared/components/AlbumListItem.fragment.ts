import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";

export const AlbumListItemFragment = gql`
    ${ImageMetaFragment}
    fragment AlbumListItemFragment on Album {
        id
        name
        allArtists {
            id
            name
        }
        coverImage {
            meta {
                ...ImageMetaFragment
            }
        }
    }
`;
