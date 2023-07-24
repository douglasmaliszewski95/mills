import { ApolloClient, InMemoryCache } from "@apollo/client";

// const environment =
//   process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_API_GRAPHQL_DEV
//     : process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_GRAPHQL_PROD
//     : process.env.NEXT_PUBLIC_API_GRAPHQL_QA;
const environment = "http://qa-site-mills.us-east-2.elasticbeanstalk.com";
const client = new ApolloClient({
  uri: `${environment}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
