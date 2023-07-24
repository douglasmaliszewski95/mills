import { gql } from "@apollo/client";

export const GET_TEXT = gql`
query Texts {
  texts {
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
        content_page
        content_text 
        content_title
        content_subtitle
        content_text_json {
          title
          subtitle
        }
        mobile
        native {
          links {
            href
          }
        }
      }
    }
  }
`;