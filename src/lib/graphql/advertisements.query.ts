import { gql } from "@apollo/client";

export const GET_ADVERTISEMENTS_QUERY = gql`
  query getAdvertisements {
    advertisements {
      id
      title
      imageUrl
      actionUrl
      updatedAt
      actionUrl
      active
      createdAt
      description
      sponsor
    }
  }
`;
