import { gql } from "@apollo/client";
import { AlbumListItemFragment } from "../components/AlbumListItem";
import { ArtistListItemFragment } from "../components/ArtistListItem";
import { PlaylistListItemFragment } from "../components/PlaylistListItem";
import { TrackListItemFragment } from "../components/TrackListItem";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_LIKEABLES_QUERY = gql`
    ${AlbumListItemFragment}
    ${TrackListItemFragment}
    ${ArtistListItemFragment}
    ${PlaylistListItemFragment}
    ${SoundMetaFragment}
    ${PaginationFragment}
    query getLikeables($page: Int!, $limit: Int = 15) {
        likeables(page: $page, limit: $limit) {
            items {
                likeableId
                likeableType
                album {
                    ...AlbumListItemFragment
                }
                track {
                    ...TrackListItemFragment
                    sound {
                        meta {
                            ...SoundMetaFragment
                        }
                    }
                }
                artist {
                    ...ArtistListItemFragment
                }
                playlist {
                    ...PlaylistListItemFragment
                }
            }
            pageInfo {
                ...PaginationFragment
            }
        }
    }
`;
