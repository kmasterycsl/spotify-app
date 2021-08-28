import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import HorizontalPadding from "../shared/components/HorizontalPadding";
import TracksList from "../shared/components/TracksList";
import VerticalPadding from "../shared/components/VerticalPadding";
import { Query } from "../types/graphql";
import { RootStackParamList } from "../types/routes.types";
import ArtistStats from "./artist/ArtistStats";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ArtistDetail">;

const getArtistById = gql`
  query getArtistById($id: String!, $page: Int!) {
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
      tracks(page: $page, limit: 15) {
        items {
          id
          name
        }
        meta {
          itemCount
          totalItems
          itemsPerPage
          totalPages
          currentPage
        }
      }
    }
  }
`;

export default function ArtistDetailScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  const { params } = useRoute<ProfileScreenRouteProp>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data, error, refetch, fetchMore } = useQuery<Query>(getArtistById, {
    variables: {
      id: params.artistId,
      page: 1,
    },
  });
  if (error) {
    console.error(error);
  }
  useEffect(() => {
    refetch();
  }, [params.artistId]);

  const goBack = () => {
    nav.goBack();
  };

  const onLoadMore = () => {
    if (loading) return;
    setLoading(true);
    fetchMore({
      variables: {
        page: page + 1,
      },
    })
      .then(() => {
        setPage((page) => page + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return data?.artist ? (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <FullWidthSquareImage url={data?.artist?.coverImage?.meta?.source}>
        <VStack
          style={{ marginTop: insets.top }}
          flexGrow={1}
          justifyContent="space-between"
        >
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
      <TracksList onLoadMore={onLoadMore} tracks={data.artist.tracks.items} />
      {loading && <ActivityIndicator />}
    </SafeAreaView>
  ) : null;
}
