import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  // uri: "https://ahouse-hono-server.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = "your-auth-token"; // Replace with your authentication token
  return {
    headers: {
      ...headers,
      Accept: "application/graphql-response+json",
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([removeTypenameLink, httpLink]),
  cache: new InMemoryCache(),

});

export default client;
