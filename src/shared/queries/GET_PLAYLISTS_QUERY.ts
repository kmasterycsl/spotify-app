import { gql } from "@apollo/client";
import { PlaylistImageFragment } from "../components/PlaylistImage.fragment";
import { PlaylistMenuFragment } from "../components/PlaylistMenu.fragment";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_PLAYLISTS_QUERY = gql`
    ${PaginationFragment}
    ${PlaylistMenuFragment}
    ${PlaylistImageFragment}
    query getPlaylists($query: String, $page: Int!, $limit: Int = 15) {
        playlists(query: $query, page: $page, limit: $limit) {
            items {
                ...PlaylistMenuFragment
                ...PlaylistImageFragment
                id
                name
            }
            pageInfo {
                ...PaginationFragment
            }
        }
    }
`;
