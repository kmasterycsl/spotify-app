import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Image,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArtistNames from "../shared/components/ArtistNames";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "../shared/components/HorizontalPadding";
import PlayerBar from "../shared/components/PlayerBar";
import SafeAreaView from "../shared/components/SafeAreaView";
import TracksList from "../shared/components/TracksList";
import VerticalPadding from "../shared/components/VerticalPadding";
import { Artist, Query } from "../types/graphql";
import { RootStackParamList } from "../types/routes.types";

type AlbumDetailScreenRouteProp = RouteProp<RootStackParamList, "AlbumDetail">;

const getAlbumById = gql`
  query getAlbumById($id: String!) {
    album(id: $id) {
      id
      name
      type
      description
      createdAt
      allArtists {
        id
        name
      }
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
      tracks {
        id
        name
        sound {
          id
          meta {
            ... on SoundMeta {
              source
              length
            }
          }
        }
        artists {
            id
            name
        }
        album {
          id
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
        }
      }
    }
  }
`;

export default function AlbumDetailScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  const { params } = useRoute<AlbumDetailScreenRouteProp>();
  const [loading, setLoading] = useState(false);
  const { data, error, refetch } = useQuery<Query>(getAlbumById, {
    variables: {
      id: params.albumId,
    },
  });
  if (error) {
    console.error(error);
  }
  useEffect(() => {
    refetch();
  }, [params.albumId]);

  const goBack = () => {
    nav.goBack();
  };

  return data?.album ? (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <VStack bgColor="transparent" justifyContent="space-between" bg="#827d8c">
        <HStack
          justifyContent="center"
          position="relative"
          mx={DEFAULT_HORIZONTAL_PADDING}
          mt={insets.top}
        >
          <IconButton
            p={0}
            position="absolute"
            hitSlop={10}
            top={0}
            left={0}
            size="sm"
            variant="ghost"
            mr="auto"
            onPress={goBack}
            icon={
              <Icon
                ml={-2}
                color="gray.400"
                as={<Ionicons name="chevron-back-outline" />}
              ></Icon>
            }
          />
          <Image
            shadow={2}
            alt=""
            source={{ uri: data.album.coverImage.meta.source }}
            style={{ width: 250, height: 250 }}
          />
        </HStack>

        <VerticalPadding style={{ backgroundColor: "transparent" }} />

        <HorizontalPadding style={{ backgroundColor: "transparent" }}>
          <Text fontSize="2xl" color="white">
            {data.album.name}
          </Text>
          <ArtistNames artists={data.album.allArtists} />
          <Text>
            <Text color="gray.300" textTransform="capitalize">
              {data.album.type}
            </Text>
            <Text color="gray.300">
              {" "}
              - {new Date(data.album.createdAt).getFullYear()}
            </Text>
          </Text>
          <VerticalPadding style={{ backgroundColor: "transparent" }} />
        </HorizontalPadding>
      </VStack>
      <VerticalPadding />
      <HorizontalPadding>
        <Text fontSize="lg" bold>
          Popular
        </Text>
      </HorizontalPadding>
      <VerticalPadding />
      <TracksList
        isFinished={false}
        isLoading={loading}
        onLoadMore={() => {}}
        tracks={data.album.tracks}
      />
      <PlayerBar />
    </SafeAreaView>
  ) : null;
}
