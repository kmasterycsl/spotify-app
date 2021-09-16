import { gql } from "@apollo/client";

export const SoundMetaFragment = gql`
    fragment SoundMetaFragment on SoundMeta {
        source
        length
    }
`;
