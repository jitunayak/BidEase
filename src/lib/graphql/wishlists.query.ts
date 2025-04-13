import { gql } from "@apollo/client";

export const GET_WISHLISTS_QUERY = gql`
  query getWishlists {
    wishlist {
      wishlistId
      createdAt
      auction {
        id
        title
        location
        emd
        startTime
        startingBid
        images
      }
    }
  }
`;
