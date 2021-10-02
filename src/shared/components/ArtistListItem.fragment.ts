import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { gql } from "@apollo/client";

export const ArtistListItemFragment = gql`
    ${ImageMetaFragment}
    fragment ArtistListItemFragment on Artist {
        id
        name
        avatarImage {
            meta {
                ...ImageMetaFragment
            }
        }
    }
`;
