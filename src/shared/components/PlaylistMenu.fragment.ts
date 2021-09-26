import { gql } from "@apollo/client";
import { PlaylistCoverImageFragment } from "./PlaylistCoverImage.fragment";

export const PlaylistMenuFragment = gql`
    ${PlaylistCoverImageFragment}
    fragment PlaylistMenuFragment on Playlist {
        id
        userId
        ...PlaylistCoverImageFragment
    }
`;
