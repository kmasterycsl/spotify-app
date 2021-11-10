import { gql } from "@apollo/client/core";

export const LIKE_MUTATION = gql`
    mutation like($likeableType: LikeableType!, $likeableId: String!) {
        like(likeableType: $likeableType, likeableId: $likeableId)
    }
`;
