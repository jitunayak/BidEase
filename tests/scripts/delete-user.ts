import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://ahouse-hono-server.onrender.com/graphql",
  // uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

(async () => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation VerifyOtp($phoneNumber: String!, $otp: String!) {
          verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
            token
            id
            user {
              id
            }
          }
        }
      `,
      variables: { phoneNumber: "7377056996", otp: "0000" },
    });

    console.log("retrieved user id", data.verifyOtp.id);
    const id = data.verifyOtp.id;
    const result = await client.mutate({
      mutation: gql`
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables: { id },
    });

    console.log("user deleted", result.data.deleteUser);
  } catch (err) {
    console.log(err);
  }
})();
