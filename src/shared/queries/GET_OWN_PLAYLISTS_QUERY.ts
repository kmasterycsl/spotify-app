import { gql } from "@apollo/client";

export const GET_OWN_PLAYLISTS_QUERY = gql`
    query getOwnPlaylists {
        getOwnPlaylists {
            id
            name
            tracksCount
        }
    }
`;
