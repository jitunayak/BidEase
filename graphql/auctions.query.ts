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
