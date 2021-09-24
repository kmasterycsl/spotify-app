import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";

export const PlaylistImageFragment = gql`
    ${ImageMetaFragment}
    fragment PlaylistImageFragment on Playlist {
        coverImage {
            id
            meta {
                ...ImageMetaFragment
            }
        }
    }
`;
