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
      }
    }
  `);
