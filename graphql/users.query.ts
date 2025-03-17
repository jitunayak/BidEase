import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    phoneNumber
    name
    kyc {
      aadharNumber
      panNumber
      isAadharVerified
      isPanVerified
    }
    preferences {
      interests
      notifications {
        emailNotifications
        pushNotifications
        smsNotifications
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  ${USER_FRAGMENT}
  query User($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
`;

export const UPDATE_USER_PREFERENCE = gql`
  mutation UpdateUserInterests($id: ID!, $interests: [String!]!) {
    updateUserInterests(id: $id, interests: $interests) {
      id
    }
  }
`;
