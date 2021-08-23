export type RootStackParamList = {
    Home: {},
    ArtistDetail: { artistId: string };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}