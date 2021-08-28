import { Ionicons } from "@expo/vector-icons";
import { HStack, IconButton, Text, useToast, VStack } from "native-base";
import React, { useContext } from "react";
import { Image } from "react-native";
import {
  actionPause,
  actionResume,
  actionUpdatePosition,
  actionUpdateTotalDuration,
} from "../../store/actions";
import { AppStateContext } from "../../store/store";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import { Audio } from "expo-av";
import { useEffect } from "react";
import { Sound } from "expo-av/build/Audio";

export default function PlayerController() {
  const {
    state: { player },
    dispatch,
  } = useContext(AppStateContext);
  const toast = useToast();
  const [soundCtrl, setSoundCtrl] = React.useState<Sound>();

  React.useEffect(() => {
    if (soundCtrl) {
      // Cleanup
      return () => {
        soundCtrl.unloadAsync();
      };
    }
  }, [soundCtrl]);

  useEffect(() => {
    (async () => {
      if (!player.playingTrack) {
        return;
      }

      console.log(soundCtrl, player.playingTrack.sound.meta.source);
      if (soundCtrl) {
        await soundCtrl.unloadAsync();
      }
      try {
        const { sound, status } = await Audio.Sound.createAsync({
          uri: player.playingTrack.sound.meta.source,
        });
        console.log({ statusCreateAsync: status });
        if (status.isLoaded) {
          actionUpdateTotalDuration(dispatch)(status.durationMillis || 0);
        }
        sound.setOnPlaybackStatusUpdate((playbackStatus) => {
          // console.log({ playbackStatus });
          if (playbackStatus.isLoaded) {
            actionUpdatePosition(dispatch)(playbackStatus.positionMillis);
          }
        });
        sound.playAsync();
        setSoundCtrl(sound);
      } catch (e) {
        toast.show({
          status: "error",
          title: "Can't load track",
        });
        console.error({ e });
      }
    })();
  }, [player.playingTrack]);

  // Update sound controller state based on store's state
  useEffect(() => {
    (async () => {
      if (soundCtrl) {
        if (player.playingState === "paused") {
          await soundCtrl.pauseAsync();
        } else if (player.playingState === "playing") {
          await soundCtrl.playAsync();
        }
      }
    })();
  }, [player.playingState]);

  soundCtrl?.loadAsync;

  return null;
}
