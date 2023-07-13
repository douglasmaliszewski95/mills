import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    # users: [User]
    # user(nome: String): [User]
    imagesHome(description: String): [Image]
  }

  type ResultImagesHome {
    count: String
    items: [ImagesHome]
  }

  type ImagesHome {
    description: String
    type: String
    fileExtension: String
    name: String
    id: String
    fileGroup: String
    slug: String
  }

  type Image {
    id: String
    type: String
    name: String
    language: String
    fileExtension: String
    fields: Fields
    fileGroup: String
    links: [Links]
  }

  type Fields {
    metadata: Metadata
    native: Native
    renditions: [Renditions]
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
