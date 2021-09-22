export type RootStackParamList = {
    Home: {};
    Login: {};
    Profile: {};
    ArtistDetail: { artistId: string };
    AlbumDetail: { albumId: string };
    PlaylistDetail: { playlistId: string };
    LibraryHome: {};
    GenreList: {};
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
