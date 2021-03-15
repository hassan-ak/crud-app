import "./src/styles/global.css";
import wrapRootElement from "./wrap-root-element";
import React from "react";
import netlifyIdentity from "netlify-identity-widget";
import { setContext } from "apollo-link-context";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://project12b-hassanalikhan.netlify.app/.netlify/functions/crud",
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const _wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};
export { _wrapRootElement as wrapRootElement };
