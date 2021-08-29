import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useToast } from "native-base";
import React, { useEffect } from "react";
import { useStore } from "../../store/store";

export default function PlayerController() {
  const player = useStore((store) => store.player);
  const actionUpdateTotalDuration = useStore(
    (store) => store.actionUpdateTotalDuration
  );
  const actionUpdatePosition = useStore((store) => store.actionUpdatePosition);
  const actionNext = useStore((store) => store.actionNext);
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
      if (soundCtrl) {
        await soundCtrl.unloadAsync();
      }
      try {
        const { sound, status } = await Audio.Sound.createAsync({
          uri: player.playingTrack.sound.meta.source,
        });
        if (status.isLoaded) {
          actionUpdateTotalDuration(status.durationMillis || 0);
          sound.setPositionAsync((status.durationMillis || 0) * 0.95);
        }
        sound.setOnPlaybackStatusUpdate((playbackStatus) => {
          if (playbackStatus.isLoaded) {
            actionUpdatePosition(playbackStatus.positionMillis);

            if (
              playbackStatus.durationMillis &&
              playbackStatus.positionMillis >= playbackStatus.durationMillis
            ) {
              actionNext();
            }
          }
        });
        sound.playAsync();
        setSoundCtrl(sound);
      } catch (e) {
        toast.show({
          status: "error",
          title: "Can't load track",
          width: '100%'
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
