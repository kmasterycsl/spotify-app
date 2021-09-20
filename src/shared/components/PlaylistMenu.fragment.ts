import { gql } from "@apollo/client";

export const PlaylistMenuFragment = gql`
    fragment PlaylistMenuFragment on Playlist {
        id
        userId
    }
`;
