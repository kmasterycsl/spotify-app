import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useAnimatedProps,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
    _DEFAULT_HORIZONTAL_PADDING,
} from "../shared/components/HorizontalPadding";
import PlayerBar from "../shared/components/PlayerBar";
import SafeAreaView from "../shared/components/SafeAreaView";
import TracksList from "../shared/components/TracksList";
import VerticalPadding from "../shared/components/VerticalPadding";
import { ImageMeta, Query, TrackEdge } from "../types/graphql";
import { RootStackParamList } from "../types/routes.types";
import ArtistStats from "./artist/ArtistStats";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ArtistDetail">;

export const GET_ARTIST_BY_ID_QUERY = gql`
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
                        dominantColor
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
                        dominantColor
                    }
                }
            }
            tracks(page: $page, limit: 15) {
                items {
                    id
                    name
                    isLiked
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

const screenWidth = Dimensions.get("screen").width;

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
    const { data, error, refetch, fetchMore } = useQuery<Query>(GET_ARTIST_BY_ID_QUERY, {
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

    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y;
    });

    const stylez = useAnimatedStyle(() => {
        return {
            opacity: 1 - translationY.value / screenWidth,
            // transform: [
            //     {
            //         scale: 1 - translationY.value / 600,
            //     },
            // ],
        };
    });

    const styleHeader = useAnimatedStyle(() => {
        return {
            opacity: (translationY.value * 1.4) / screenWidth,
        };
    });

    const backIconBg = useAnimatedProps(() => {
        return {
            backgroundColor: translationY.value / screenWidth > 0.5 ? "transparent" : "gray",
        };
    });

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
        <SafeAreaView style={{ flex: 1, position: "relative" }} edges={["bottom"]}>
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        width: "100%",
                        opacity: 0,
                        zIndex: 3,
                    },
                    styleHeader,
                ]}
            >
                <HStack
                    style={{ paddingTop: insets.top }}
                    px={DEFAULT_HORIZONTAL_PADDING}
                    pb={DEFAULT_HORIZONTAL_PADDING}
                    justifyContent="center"
                    width="100%"
                    position="absolute"
                    bg={(data?.artist?.coverImage?.meta as ImageMeta)?.dominantColor}
                >
                    <Text>{data.artist.name}</Text>
                </HStack>
            </Animated.View>

            <Box style={{ position: "absolute", zIndex: 3 }}>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: insets.top,
                            left: _DEFAULT_HORIZONTAL_PADDING,
                        },
                        // styleBackIcon,
                    ]}
                >
                    <Animated.View
                        style={[
                            {
                                backgroundColor: "gray",
                                borderRadius: 100,
                            },
                            backIconBg,
                        ]}
                    >
                        <Icon
                            size={5}
                            color="gray.400"
                            as={<Ionicons name="chevron-back-outline" />}
                        ></Icon>
                    </Animated.View>
                </Animated.View>
            </Box>

            <Animated.View style={[{ position: "absolute", zIndex: 0 }, stylez]}>
                <FullWidthSquareImage
                    url={data?.artist?.coverImage?.meta?.source}
                ></FullWidthSquareImage>
            </Animated.View>

            <TracksList
                style={{
                    position: "absolute",
                    paddingTop: screenWidth - 40,
                    paddingBottom: 500,
                    top: 0,
                    left: 0,
                    height: "100%",
                    zIndex: 2,
                }}
                onScroll={scrollHandler}
                headerComponent={
                    <>
                        <HorizontalPadding style={{ backgroundColor: "transparent" }}>
                            <Text fontSize="3xl" color="white">
                                {data.artist.name}
                            </Text>
                            <VerticalPadding
                                multiple={2}
                                style={{ backgroundColor: "transparent" }}
                            />
                        </HorizontalPadding>
                        <ArtistStats onPressPlay={onPressPlay} />
                        <HorizontalPadding>
                            <Text fontSize="lg" bold>
                                Popular
                            </Text>
                        </HorizontalPadding>
                        <VerticalPadding />
                    </>
                }
                isFinished={paginationMeta.currentPage >= paginationMeta.totalPages}
                isLoading={loading}
                onLoadMore={onLoadMore}
                tracks={data.artist.tracks.items}
            />
            <PlayerBar />
        </SafeAreaView>
    ) : null;
}
