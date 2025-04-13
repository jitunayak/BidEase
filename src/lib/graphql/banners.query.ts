import { gql } from "@apollo/client";

export const GET_BANNERS_QUERY = gql`
  query getBanners {
    banners {
      id
      title
      imageUrl
      actionText
      updatedAt
      actionUrl
      active
      backgroundColor
      createdAt
      subtitle
      textColor
    }
  }
`;
