import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql(`
    query User($id: ID!) {
      user( id: $id) {
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
        preferences{
          interests
          notifications
          {
            emailNotifications
            pushNotifications
            smsNotifications

          }
        }
      }
    }
  `);

export const UPDATE_USER_PREFERENCE = gql(`
  mutation UpdateUserInterests($id: ID!, $interests : [String!]!) {
    updateUserInterests(id: $id, interests:  $interests) {
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
        preferences{
          interests
          notifications
          {
            emailNotifications
            pushNotifications
            smsNotifications

          }
        }
      }
    
    }

`);
