import { gql } from "@apollo/client";
import { AlbumListItemFragment } from "../components/AlbumListItem.fragment";
import { ArtistListItemFragment } from "../components/ArtistListItem.fragment";
import { PlaylistListItemFragment } from "../components/PlaylistListItem.fragment";
import { TrackListItemFragment } from "../components/TrackListItem.fragment";
import { PaginationFragment } from "../fragments/pagination.fragment";
import { SoundMetaFragment } from "../fragments/sound-meta.fragment";

export const GET_LIKEABLES_QUERY = gql`
    ${AlbumListItemFragment}
    ${TrackListItemFragment}
    ${ArtistListItemFragment}
    ${PlaylistListItemFragment}
    ${SoundMetaFragment}
    ${PaginationFragment}
    query getLikeables($page: Int!, $limit: Int = 15, $likeableType: LikeableType) {
        likeables(page: $page, limit: $limit, likeableType: $likeableType) {
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
