import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { Icon, IconButton, VStack } from "native-base";
import React from "react";
import { Modal } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import DraggableTracksList from "./DraggableTrackList";
import Empty from "./Empty";
import HorizontalPadding from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";

export default function PlayerList({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}) {
    const tracksQueue = usePlayerStore(state => state.tracksQueue);
    const actionUpdateQueue = usePlayerStore(store => store.actionUpdateQueue);

    return (
        <Modal animationType="fade" presentationStyle="fullScreen" visible={visible}>
            <RootSiblingParent>
                <SafeAreaView style={{ flexGrow: 1 }} mode="padding">
                    <VStack flexGrow={1}>
                        <IconButton
                            alignSelf="flex-start"
                            onPress={() => setVisible(false)}
                            icon={
                                <Icon color="white" as={<Ionicons name="close-outline" />}></Icon>
                            }
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
        </Modal>
    );
}
