import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { useCommonStore } from "@/store/common.store";
import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import HomeGenres from "./home/home-genres";
import HomeHeader from "./home/home-header";
import HomeLikeables from "./home/home-likeables";

export default function HomeScreen() {
    const currentUser = useCommonStore(state => state.currentUser);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         refetch();
    //     });

    //     return unsubscribe;
    // }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <HomeHeader />
            <VerticalPadding />

            <ScrollView>
                {currentUser && (
                    <>
                        <HomeLikeables />
                        <VerticalPadding />
                    </>
                )}

                <HomeGenres />
                <VerticalPadding />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
