import { gql } from "@apollo/client";

export const ImageMetaFragment = gql`
    fragment ImageMetaFragment on ImageMeta {
        source
        width
        height
        dominantColor
    }
`;
