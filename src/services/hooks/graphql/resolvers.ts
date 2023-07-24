import ParamsSearch from "@/dtos/ParamsSearch";

// const environment =
//   process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_API_GRAPHQL_DEV
//     : process.env.NODE_ENV === "production"
//       ? process.env.NEXT_PUBLIC_API_GRAPHQL_PROD
//       : process.env.NEXT_PUBLIC_API_GRAPHQL_QA;
const environment = "http://qa-site-mills.us-east-2.elasticbeanstalk.com";
const resolvers = {
  Query: {
    images: async (parent: any, args: ParamsSearch) => {
      const result = await fetch(
        `${environment}/api/images?description=${args.description}`
      ).then((res) => res.json());
      return result;
    },
    texts: async (parent: any, args: ParamsSearch) => {
      const result = await fetch(`${environment}/api/texts`).then((res) =>
        res.json()
      );
      return result;
    },
  },
};

export default resolvers;
