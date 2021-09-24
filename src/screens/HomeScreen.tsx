import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import HomeGenres from "./home/home-genres";
import HomeHeader from "./home/home-header";
import HomeLikeables from "./home/home-likeables";

export default function HomeScreen() {
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         refetch();
    //     });

    //     return unsubscribe;
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader />
            <VerticalPadding />

            <ScrollView>
                <HomeLikeables />
                <VerticalPadding />

                <HomeGenres />
                <VerticalPadding />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
