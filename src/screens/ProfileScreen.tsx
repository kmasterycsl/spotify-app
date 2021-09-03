import { gql, useQuery } from "@apollo/client";
import { Text } from "native-base";
import React from "react";
import SafeAreaView from "../shared/components/SafeAreaView";
import { Query } from "../types/graphql";

const WHOAMI_QUERY = gql`
  query whoAmI {
    whoAmI {
      name
    }
  }
`;

export default function ProfileScreen() {
  const { data, error, refetch, fetchMore } = useQuery<Query>(WHOAMI_QUERY, {});

  return (
    <SafeAreaView>
      <Text>{data?.whoAmI?.name || "NOT FOUND"}</Text>
    </SafeAreaView>
  );
}
