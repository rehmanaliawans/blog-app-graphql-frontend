import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { offsetLimitPagination } from '@apollo/client/utilities';

import { deleteToken, getToken } from '../utils';

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken("token");
  operation.setContext({
    headers: {
      "Content-Type": "application/x-ndjson",
      authorization: `Bearer ${token}`
    }
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}`
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const unauthorized = graphQLErrors.find((error) => error.message === "invalid token");
    const forbidden = graphQLErrors.find((error) => error.message === "jwt expired");

    if (unauthorized || forbidden) {
      deleteToken("token");
      client.clearStore();
      window.location.replace("/login"); //use history or use location
    }
  }
  if (networkError) {
    alert("check internet connection!");
    client.clearStore();
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: offsetLimitPagination()
      }
    }
  }
});
const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: from([authMiddleware, errorLink, httpLink])
});

export default client;
