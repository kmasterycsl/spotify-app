import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { useCommonStore } from "@/store/common.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import HomeGenres from "./home/home-genres";
import HomeHeader from "./home/home-header";
import HomeLikeables from "./home/home-likeables";

export default function HomeScreen() {
    const currentUser = useCommonStore(state => state.currentUser);
    const actionSetBottomTabHeight = useCommonStore(state => state.actionSetBottomTabHeight);
    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        actionSetBottomTabHeight(tabBarHeight);
    }, [tabBarHeight]);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         refetch();
    //     });

    //     return unsubscribe;
    // }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <HomeHeader />

            <ScrollView>
                {currentUser && (
                    <>
                        <VerticalPadding />
                        <HomeLikeables />
                    </>
                )}

                <HomeGenres />
                {/* <VerticalPadding /> */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
