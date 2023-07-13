import { gql } from "@apollo/client";

export const GET_IMAGE = gql`
  query ImagesHome($description: String) {
    imagesHome(description: $description) {
      fileExtension
      fileGroup
      id
      name
      type
      fields {
        native {
          links {
            href
            rel
            method
            mediaType
          }
        }
      }
    }
  }
`;
