import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "@/services/hooks/graphql/resolvers";
import typeDefs from "@/services/hooks/graphql/schemas";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res })
})

export default handler;
