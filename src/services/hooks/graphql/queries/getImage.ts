import { gql } from "@apollo/client";

export const GET_IMAGE = `
  query Images($description: String) {
    images(description: $description) {
      count
      items {
        fileExtension
        fileGroup
        id
        language
        name
        type
        fields {
          alt_attribute
          content_area
          content_order
          content_page
          content_text
          content_title
          content_subtitle
          mobile
          native {
            links {
              href
            }
          }
        }
      }
    }
  }
`;
