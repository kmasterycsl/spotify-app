export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Profile: undefined;
    MainTab: undefined;
    ArtistDetail: { artistId: string };
    AlbumDetail: { albumId: string };
    PlaylistDetail: { playlistId: string };
    LibraryHome: undefined;
    GenreList: undefined;
    GenreDetail: { genreId: string };
    Search: undefined;
    Account: undefined;
    TrackMenu: { trackId: string };
    PlaylistMenu: { playlistId: string };
    CreatePlaylist: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
