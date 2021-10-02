import { gql } from "@apollo/client";

export const ADD_TRACK_TO_PLAYLIST_MUTATION = gql`
    mutation addTrackToPlaylist($trackId: String!, $playlistId: String!) {
        addTrackToPlaylist(trackId: $trackId, playlistId: $playlistId) {
            id
            name
        }
    }
`;
