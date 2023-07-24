import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    images(description: String): ResultSearchCMS
    texts: ResultSearchCMS
  }

  type ResultSearchCMS {
    count: String
    items: [SearchCMS]
  }

  type SearchCMS {
    id: String
    type: String
    name: String
    language: String
    fileExtension: String
    fields: Fields
    fileGroup: String
    description: String
  }

  type Fields {
    metadata: Metadata
    native: Native
    renditions: [Renditions]
    alt_attribute: String
    content_area: String
    content_order: String
    content_page: String
    content_text: String
    content_title: String
    content_subtitle: String
    content_text_json:[Json]
    mobile: Boolean
  }

  type Json {
    title: String
    subtitle: String
  }

  type Native {
    links: [Links]
  }

  type Metadata {
    width: String
    height: String
  }

  type Links {
    href: String
    rel: String
    method: String
    mediaType: String
  }

  type Renditions {
    name: String
    id: String
    formats: [Formats]
    type: String
  }

  type Formats {
    format: String
    size: Int
    mimeType: String
    metadata: Metadata
    links: [Links]
  }
`;
export default typeDefs;
