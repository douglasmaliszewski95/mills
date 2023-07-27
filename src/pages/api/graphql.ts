import resolvers from "@/services/hooks/graphql/resolvers";
import typeDefs from "@/services/hooks/graphql/schemas";
import { NextApiRequest, NextApiResponse } from "next";
import { createSchema, createYoga } from 'graphql-yoga'

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false
  }
}

const schema = createSchema({
  typeDefs,
  resolvers
})

export default createYoga<{
  cors?: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['X-Custom-Header'],
    methods: ['POST']
  }
  req?: NextApiRequest
  res?: NextApiResponse
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql'
})