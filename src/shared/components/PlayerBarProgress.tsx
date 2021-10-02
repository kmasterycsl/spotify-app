import { usePlayerStore } from "@/store/player.store";
import Slider from "@react-native-community/slider";
import { useTheme } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import shallow from "zustand/shallow";

export default function PlayerBarProgress() {
    const { colors } = useTheme();
    const [pre, setPre] = useState(0);

    const [actionUpdatePosition, soundControllerStatus] = usePlayerStore(
        store => [store.actionUpdatePosition, store.soundControllerStatus],
        shallow
    );

    const progess =
        soundControllerStatus && soundControllerStatus.isLoaded
            ? soundControllerStatus.positionMillis
            : 0;

    const onSlidingStart = () => {
        setPre(progess);
    };

    const onProgressChange = (progress: number) => {
        actionUpdatePosition(progress);
        setPre(progress);
        setPre(0);
    };

    return (
        <Slider
            value={pre || progess}
            style={styles.slider}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onProgressChange}
            thumbImage={require("../../../assets/thumb.png")}
            minimumValue={0}
            maximumValue={
                soundControllerStatus?.isLoaded ? soundControllerStatus?.durationMillis || 0 : 0
            }
            minimumTrackTintColor={colors.primary["300"]}
            maximumTrackTintColor={colors.primary["100"]}
        />
    );
}

const styles = StyleSheet.create({
    slider: {
        opacity: 1,
        height: 10,
    },
});
