import ParamsSearch from "@/dtos/ParamsSearch";

const environment =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_GRAPHQL_DEV
    : process.env.NODE_ENV === "production"
    ? "https://mills.vercel.app"
    : "https://mills.vercel.app";

  console.log(environment)

const resolvers = {
  Query: {
    imagesHome: async (parent: any, args: ParamsSearch) => {
      const result = await fetch(
        `${environment}/api/images?description=${args.description}`
      ).then((res) => res.json());
      return result;
    },
  },
};

export default resolvers;
