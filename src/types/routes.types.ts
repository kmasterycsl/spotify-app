export type RootStackParamList = {
    Home: {},
    Login: {},
    ArtistDetail: { artistId: string };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}