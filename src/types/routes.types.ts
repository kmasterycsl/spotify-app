export type RootStackParamList = {
    Home: {},
    Login: {},
    Profile: {},
    ArtistDetail: { artistId: string };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}