import { gql } from "@apollo/client";

export const GET_AUCTIONS = gql(`
  query Auctions {
    auctions {
      id
      title
      description
      images
      bid
    }
  }
`);

export const GET_AUCTION = gql`
  query Auction($id: ID!) {
    auction(id: $id) {
      id
      title
      description
      bid
      emd
      category
      location
      images
      endsAt
      createdAt
      updatedAt
      status
    }
  }
`;
