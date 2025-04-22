import { gql } from "@apollo/client";

export const GET_AUCTIONS = gql`
  query Auctions(
    $featured: Boolean
    $category: String
    $location: String
    $bidRange: [Float]
  ) {
    auctions(
      featured: $featured
      category: $category
      location: $location
      bidRange: $bidRange
    ) {
      id
      title
      currentBid
      description
      category
      location
      images
      createdAt
      updatedAt
      status
      bankId
      featured
      location
      basePrice
      location
      startTime
      endTime
      viewCount
      startingBid
    }
  }
`;

export const GET_AUCTION = gql`
  query Auction($id: ID!) {
    auction(id: $id) {
      id
      title
      description
      emd
      category
      location
      images
      createdAt
      updatedAt
      status
      bankId
      featured
      location
      basePrice
      location
      startTime
      endTime
      viewCount
      startingBid
      currentBid
      incrementAmount
      bidCount
    }
    isWishListed(auctionId: $id) {
      isWishListed
    }
  }
`;
