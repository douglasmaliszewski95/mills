import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client";

// const environment = createHttpLink({
//   uri: process.env.URL_API,
// });
// const environment = process.env.URL_API;
const environment = "https://novo-site-qa.mills.com.br";

const client = new ApolloClient({
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
