import { ApolloClient, InMemoryCache } from "@apollo/client";

const environment =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_GRAPHQL_DEV
    : process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_GRAPHQL_PROD
    : "https://mills.vercel.app";


console.log(environment)    
const client = new ApolloClient({
  uri: `${environment}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
