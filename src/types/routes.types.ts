export type RootStackParamList = {
    Home: {};
    Login: {};
    Profile: {};
    ArtistDetail: { artistId: string };
    AlbumDetail: { albumId: string };
    PlaylistDetail: { playlistId: string };
    LibraryHome: {};
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
