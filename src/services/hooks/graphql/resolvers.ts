import ParamsSearch from "@/dtos/ParamsSearch";

// const environment = "http://localhost:3000";
const environment = "https://testedouglas.vercel.app";
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
