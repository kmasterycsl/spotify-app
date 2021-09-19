import { gql } from "@apollo/client";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";

export const PlaylistListItemFragment = gql`
    ${ImageMetaFragment}
    fragment PlaylistListItemFragment on Playlist {
        id
        name
        tracksCount
    }
`;
