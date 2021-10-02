import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { ArtistNamesFragment } from "./ArtistNames";

export const TrackListItemFragment = gql`
    ${ArtistNamesFragment}
    ${ImageMetaFragment}
    fragment TrackListItemFragment on Track {
        id
        name
        album {
            id
            coverImage {
                meta {
                    ...ImageMetaFragment
                }
            }
        }
        artists {
            ...ArtistNamesFragment
        }
    }
`;
