import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon, IconButton, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "../shared/components/HorizontalPadding";
import PlayerBar from "../shared/components/PlayerBar";
import SafeAreaView from "../shared/components/SafeAreaView";
import TracksList from "../shared/components/TracksList";
import VerticalPadding from "../shared/components/VerticalPadding";
import { Query } from "../types/graphql";
import { RootStackParamList } from "../types/routes.types";

type AlbumDetailScreenRouteProp = RouteProp<RootStackParamList, "AlbumDetail">;

const getAlbumById = gql`
  query getAlbumById($id: String!) {
    album(id: $id) {
      id
      name
      type
      description
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
      <FullWidthSquareImage url={data?.album?.coverImage?.meta?.source}>
        <VStack
          style={{ marginTop: insets.top }}
          bgColor="transparent"
          flexGrow={1}
          justifyContent="space-between"
        >
          <HorizontalPadding
            multiple={5.5 / DEFAULT_HORIZONTAL_PADDING}
            style={{ backgroundColor: "transparent", alignSelf: "flex-start" }}
          >
            {/* <Box > */}
            <IconButton
              size="sm"
              variant="ghost"
              onPress={goBack}
              icon={
                <Icon
                  color="gray.400"
                  as={<Ionicons name="chevron-back-circle-outline" />}
                ></Icon>
              }
            />

            {/* </Box> */}
          </HorizontalPadding>
          <HorizontalPadding style={{ backgroundColor: "transparent" }}>
            <Text fontSize="3xl" color="white">
              {data.album.name}
            </Text>
            <Text fontSize="3xl" color="white">
              {data.album.type}
            </Text>
            <VerticalPadding
              multiple={2}
              style={{ backgroundColor: "transparent" }}
            />
          </HorizontalPadding>
        </VStack>
      </FullWidthSquareImage>
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
