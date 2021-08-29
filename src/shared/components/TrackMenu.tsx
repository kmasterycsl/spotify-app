import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import {
  Modal,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useStore } from "../../store/store";
import FullWidthSquareImage from "./FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
  _DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { milisToMinAndSec } from "../../utils/convert";
import { Track } from "../../types/graphql";

interface TrackMenuProps {
  track: Track;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function TrackMenu({
  track,
  visible,
  setVisible,
}: TrackMenuProps) {
  const insets = useSafeAreaInsets();
  const actionPlay = useStore((state) => state.actionPlay);
  const actionAddToQueue = useStore((state) => state.actionAddToQueue);
  const dimessions = useWindowDimensions();

  const onAddToQueue = () => {
    actionAddToQueue(track);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={visible}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <VStack>
            {/* Image */}
            <HStack
              justifyContent="center"
              style={{ paddingTop: dimessions.height * 0.2 }}
            >
              <FullWidthSquareImage
                padding={dimessions.width * 0.3}
                url={`https://picsum.photos/${350}/${350}?random=${track.id}`}
              ></FullWidthSquareImage>
            </HStack>
            {/* Title */}
            <VStack alignItems="center" mt={DEFAULT_HORIZONTAL_PADDING}>
              <Text fontWeight="600" fontSize="lg">
                {track.name}
              </Text>
              <Text color="gray.400" fontSize="sm">
                {track.name}
              </Text>
            </VStack>

            {/* Actions */}
            <VStack>
              <TouchableOpacity onPress={onAddToQueue}>
                <HStack
                  padding={DEFAULT_HORIZONTAL_PADDING}
                  alignItems="center"
                >
                  <Icon as={<Ionicons name="list-outline" />}></Icon>
                  <Text ml={DEFAULT_HORIZONTAL_PADDING}>Add to queue</Text>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </VStack>
        </ScrollView>
        <HStack justifyContent="center">
          <Button variant="ghost" onPress={() => setVisible(false)}>
            <Text>Close</Text>
          </Button>
        </HStack>
      </SafeAreaView>
    </Modal>
  );
}
