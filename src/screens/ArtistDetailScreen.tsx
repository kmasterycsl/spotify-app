import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, Image } from "react-native";
import { RootStackParamList } from "../types/routes.types";
import { RouteProp } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { Query } from "../types/graphql";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ArtistDetail">;

const getArtistById = gql`
  query getArtistById {
    getArtistById(id: "1") {
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
    }
  }
`;

export default function ArtistDetailScreen() {
  const { params } = useRoute<ProfileScreenRouteProp>();
  const { data, loading, error } = useQuery<Query>(getArtistById);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ArtistDetailScreen Screen {params?.artistId}</Text>
      <Text>{data?.getArtistById.name}</Text>
      <Text>Isee: {data?.getArtistById?.avatarImage?.meta?.source}</Text>
      <Image
        style={{
          // @ts-ignore
          width: data?.getArtistById?.avatarImage?.meta?.width,
          // @ts-ignore
          height: data?.getArtistById?.avatarImage?.meta?.height,
        }}
        source={{ uri: data?.getArtistById?.avatarImage?.meta?.source }}
        // source={{ uri: "https://i1-vnexpress.vnecdn.net/2021/08/23/kiem-tra-jpeg-8357-1629665752-3241-1629721702.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=efd18F32ao3zWhdnjpafaA"}}
      ></Image>
    </View>
  );
}
