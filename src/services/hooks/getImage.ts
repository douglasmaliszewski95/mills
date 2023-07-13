import ImagesHome from "@/dtos/ImagesHome";
import { GET_IMAGE } from "./graphql/queries/getImage";
import client from "./graphql/apollo-client";

export const getImage = async (text: String) => {
  console.log(client)
  const { data } = await client.query({
    query: GET_IMAGE,
    variables: {
      description: text,
    },
  });
  console.log(data.imagesHome)
  const result: ImagesHome[] = data.imagesHome;
  return result;
};
