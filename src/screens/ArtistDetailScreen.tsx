import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, Icon, IconButton, Text, VStack } from "native-base";
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
import { Query, TrackEdge } from "../types/graphql";
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
  // const { dispatch } = useContext(AppStateContext);
  const [paginationMeta, setPaginationMeta] = useState<
    Pick<TrackEdge, "currentPage" | "totalPages">
  >({
    currentPage: 1,
    totalPages: Infinity,
  });
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

  const onPressPlay = () => {
    // if (!data) return;
    // dispatch({
    //   type: ActionTypes.ADD_TRACKS,
    //   payload: {
    //     tracks: data.artist.tracks.items || [],
    //   },
    // });
  };

  const onLoadMore = () => {
    if (loading) return;
    if (paginationMeta.currentPage >= paginationMeta.totalPages) return;
    setLoading(true);
    fetchMore({
      variables: {
        page: paginationMeta.currentPage + 1,
      },
    })
      .then(({ data }) => {
        setPaginationMeta(data.artist.tracks.meta);
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
          bgColor="transparent"
          flexGrow={1}
          justifyContent="space-between"
        >
          <HorizontalPadding
            // multiple={5.5 / DEFAULT_HORIZONTAL_PADDING}
            style={{ backgroundColor: "transparent", alignSelf: "flex-start" }}
          >
            {/* <Box > */}
            <IconButton
              variant="ghost"
              onPress={goBack}
              borderRadius={100}
              bg="gray.600"
              icon={
                <Icon
                  color="gray.500"
                  size="sm"
                  as={<Ionicons  name="chevron-back-outline" />}
                ></Icon>
              }
            />

            {/* </Box> */}
          </HorizontalPadding>
          <HorizontalPadding style={{ backgroundColor: "transparent" }}>
            <Text fontSize="3xl" color="white">
              {data.artist.name}
            </Text>
            <VerticalPadding
              multiple={2}
              style={{ backgroundColor: "transparent" }}
            />
          </HorizontalPadding>
        </VStack>
      </FullWidthSquareImage>
      <VerticalPadding />
      <ArtistStats onPressPlay={onPressPlay} />
      <HorizontalPadding>
        <Text fontSize="lg" bold>
          Popular
        </Text>
      </HorizontalPadding>
      <VerticalPadding />
      <TracksList
        isFinished={paginationMeta.currentPage >= paginationMeta.totalPages}
        isLoading={loading}
        onLoadMore={onLoadMore}
        tracks={data.artist.tracks.items}
      />
      <PlayerBar />
    </SafeAreaView>
  ) : null;
}
