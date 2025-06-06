import { gql } from "@apollo/client";

export const GET_WISHLISTS_QUERY = gql`
  query getWishlists {
    wishlists {
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
  mutation addToWishlist($auctionId: ID!) {
    addToWishlist(auctionId: $auctionId) {
      id
    }
  }

  mutation removeFromWishlist($auctionId: ID!) {
    removeFromWishlist(auctionId: $auctionId)
  }
`;
