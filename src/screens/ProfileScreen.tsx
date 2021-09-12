import { gql, useQuery } from "@apollo/client";
import { Text } from "native-base";
import React from "react";
import { WHOAMI_QUERY } from "../hooks/useAppStartup";
import SafeAreaView from "../shared/components/SafeAreaView";
import { Query } from "../types/graphql";

export default function ProfileScreen() {
    const { data } = useQuery<Query>(WHOAMI_QUERY, {});

    return (
        <SafeAreaView>
            <Text>{data?.whoAmI?.name || "NOT FOUND"}</Text>
        </SafeAreaView>
    );
}
