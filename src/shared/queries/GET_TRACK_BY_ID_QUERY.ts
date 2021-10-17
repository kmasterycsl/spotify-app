import { gql } from "@apollo/client";
import { TrackListItemFragment } from "../components/TrackListItem.fragment";

export const GET_TRACK_BY_ID_QUERY = gql`
    ${TrackListItemFragment}
    query getTrackById($id: String!) {
        track(id: $id) {
            ...TrackListItemFragment
        }
    }
`;
