import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    role
    phoneNumber
    phoneVerified
    image
    preferences {
      interests
      notifications {
        smsNotifications
        pushNotifications
        emailNotifications
      }
    }
    kyc {
      panNumber
      isPanVerified
      aadharNumber
      isAadharVerified
    }
  }
`;

export const GET_USER_QUERY = gql`
  ${USER_FRAGMENT}
  query getUser($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
`;

export const UPDATE_USER_PREFERENCE = gql`
  ${USER_FRAGMENT}
  mutation UpdateUserInterests($id: ID!, $interests: [String!]!) {
    updateUserInterests(id: $id, interests: $interests) {
      ...UserFragment
    }
  }
`;

export const UPDATE_USER_NOTIFICATIONS_PREFERENCE = gql`
  mutation updateUserNotificationPreferences(
    $id: ID!
    $emailNotifications: Boolean!
    $pushNotifications: Boolean!
    $smsNotifications: Boolean!
  ) {
    updateUserNotificationPreferences(
      id: $id
      input: {
        emailNotifications: $emailNotifications
        pushNotifications: $pushNotifications
        smsNotifications: $smsNotifications
      }
    ) {
      id
    }
  }
`;
