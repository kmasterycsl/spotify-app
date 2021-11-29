import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Icon, IconButton, VStack } from "native-base";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import DraggableTracksList from "./DraggableTrackList";
import Empty from "./Empty";
import HorizontalPadding from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";

export default function PlayerPlaylistScreen() {
    const nav = useNavigation();
    const tracksQueue = usePlayerStore(state => state.tracksQueue);
    const actionUpdateQueue = usePlayerStore(store => store.actionUpdateQueue);

    return (
        <RootSiblingParent>
            <SafeAreaView style={{ flexGrow: 1 }}>
                <VStack flexGrow={1}>
                    <IconButton
                        alignSelf="flex-start"
                        onPress={nav.goBack}
                        icon={<Icon color="white" as={<Ionicons name="close-outline" />}></Icon>}
                    />

                    {tracksQueue.length === 0 && <Empty text="Empty tracks queue" />}

                    <HorizontalPadding style={{ flexGrow: 1 }}>
                        <DraggableTracksList
                            onReorderList={actionUpdateQueue}
                            tracks={tracksQueue}
                            onLoadMore={() => {}}
                            isLoading={false}
                            isFinished={false}
                        />
                    </HorizontalPadding>
                </VStack>
            </SafeAreaView>
        </RootSiblingParent>
    );
}
