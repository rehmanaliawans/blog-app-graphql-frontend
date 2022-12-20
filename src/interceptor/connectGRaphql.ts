// packages block
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from
} from "@apollo/client";
import { getToken } from "../utils";
import { offsetLimitPagination } from "@apollo/client/utilities";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken("token");
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}`
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
  link: from([authMiddleware, httpLink])
});

export default client;
