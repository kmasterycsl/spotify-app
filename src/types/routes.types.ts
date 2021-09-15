export type RootStackParamList = {
    Home: {};
    Login: {};
    Profile: {};
    ArtistDetail: { artistId: string };
    AlbumDetail: { albumId: string };
    LibraryHome: {};
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
