import { gql } from "@apollo/client";

export const PaginationFragment = gql`
    fragment PaginationFragment on PaginationMeta {
        itemCount
        totalItems
        itemsPerPage
        totalPages
        currentPage
    }
`;
