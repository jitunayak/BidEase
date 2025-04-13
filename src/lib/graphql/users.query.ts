import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    role
    phoneNumber
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

export const UPDATE_USER_BASIC_INFO = gql`
  ${USER_FRAGMENT}
  mutation updateUserBasicInfo(
    $id: ID!
    $name: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateUser(
      id: $id
      input: { name: $name, email: $email, phoneNumber: $phoneNumber }
    ) {
      ...UserFragment
    }
  }
`;

export const OPT_SEND = gql`
  mutation sendOtp($phoneNumber: String!) {
    sendOtp(phoneNumber: $phoneNumber)
  }
`;

export const VERIFY_OTP = gql`
  ${USER_FRAGMENT}
  mutation verifyOtp($phoneNumber: String!, $otp: String!) {
    verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
      token
      id
      user {
        id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;