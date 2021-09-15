import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaView from "../shared/components/SafeAreaView";

export default function LibraryHomeScreen() {
    const insets = useSafeAreaInsets();

    return <SafeAreaView style={styles.container} edges={["bottom"]}></SafeAreaView>;
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
