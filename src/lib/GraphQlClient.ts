import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { router } from "expo-router";
import { Alert } from "react-native";
import { storage } from "../hooks/storage";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  // uri: "https://ahouse-hono-server.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = storage.get("user.token");
  console.log("token", token);

  if (!token) {
    router.replace("/(auth)/login");
  }
  return {
    headers: {
      ...headers,
      Accept: "application/graphql-response+json",
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // console.log("🚀 ~ forward:", forward);
    // console.log("🚀 ~ operation:", operation);
    console.log("🚀 ~ graphQLErrors:", graphQLErrors);

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.error(`[GraphQL error]: Message: ${err.message}`);
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message === "Unauthorized"
        ) {
          console.log("Authentication error detected. Logging out.");
          // Dispatch a logout action (if using Redux or Zustand)
          // Or directly update state and navigate
          storage.remove("user.token");
          Alert.alert("Error", "Session expired. Please login again.");
          router.replace("/(auth)/login");
          // Assuming you have a navigation object accessible
          // if (navigationRef.current) {
          //   navigationRef.current.dispatch(StackActions.replace("Login"));
          // }
        }
      }
    }

    if (networkError) {
      console.error(
        `[Network error]: ${networkError}, [Operation]: ${operation.operationName}`
      );
      // Handle network errors (e.g., display a "No internet" message)
    }
  }
);

const client = new ApolloClient({
  link: from([removeTypenameLink, authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
