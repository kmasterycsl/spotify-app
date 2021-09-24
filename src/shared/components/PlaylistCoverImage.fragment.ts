import { gql } from "@apollo/client";
import { PlaylistImageFragment } from "./PlaylistImage.fragment";

export const PlaylistCoverImageFragment = gql`
    ${PlaylistImageFragment}
    fragment PlaylistCoverImageFragment on Playlist {
        ...PlaylistImageFragment
    }
`;
