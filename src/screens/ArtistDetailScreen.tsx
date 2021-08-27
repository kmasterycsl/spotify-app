import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Button, TouchableHighlight, ScrollView } from "react-native";
import { RootStackParamList } from "../types/routes.types";
import { RouteProp } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { Query } from "../types/graphql";
import { useEffect } from "react";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HorizontalPadding from "../shared/components/HorizontalPadding";
import TracksList from "../shared/components/TracksList";
import { Divider, Text, VStack } from "native-base";
import VerticalPadding from "../shared/components/VerticalPadding";
import ArtistStats from "./artist/ArtistStats";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ArtistDetail">;

const getArtistById = gql`
  query getArtistById($id: String!) {
    artist(id: $id) {
      id
      name
      isVerified
      biography
      coverImage {
        id
        meta {
          ... on ImageMeta {
            source
            width
            height
          }
        }
      }
      avatarImage {
        id
        meta {
          ... on ImageMeta {
            source
            width
            height
          }
        }
      }
      tracks(page: 1, limit: 100) {
        items {
          id
          name
        }
      }
    }
  }
`;

export default function ArtistDetailScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  const { params } = useRoute<ProfileScreenRouteProp>();
  const { data, loading, error, refetch } = useQuery<Query>(getArtistById, {
    variables: { id: params.artistId },
  });
  useEffect(() => {
    refetch();
  }, [params.artistId]);

  const goBack = () => {
    nav.goBack();
  };

  return data?.artist ? (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView>
        <FullWidthSquareImage url={data?.artist?.coverImage?.meta?.source}>
          <VStack style={{marginTop: insets.top}} flexGrow={1} justifyContent="space-between">
            <HorizontalPadding>
              <Ionicons
                onPress={goBack}
                name="chevron-back-circle-outline"
                size={32}
              />
            </HorizontalPadding>
            <HorizontalPadding>
              <Text fontSize="3xl" color="white">
                {data.artist.name}
              </Text>
              <VerticalPadding multiple={2} />
            </HorizontalPadding>
          </VStack>
        </FullWidthSquareImage>
        <VerticalPadding />
        <ArtistStats />
        <HorizontalPadding>
          <Text fontSize="lg" bold>
            Popular
          </Text>
        </HorizontalPadding>
        <VerticalPadding />
        <TracksList tracks={data.artist.tracks.items} />
      </ScrollView>
    </SafeAreaView>
  ) : null;
}
