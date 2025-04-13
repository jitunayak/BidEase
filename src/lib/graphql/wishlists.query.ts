import { gql } from "@apollo/client";

export const GET_WISHLISTS_QUERY = gql`
  query getWishlists {
    wishlist {
      id
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

  # mutation removeFromWishlist($auctionId: Int!) {
  #   removeFromWishlist(auctionId: $auctionId) {

  #   }
  # }
  mutation addToWishlist($auctionId: Int!) {
    addToWishlist(auctionId: $auctionId) {
      id
    }
  }
`;
