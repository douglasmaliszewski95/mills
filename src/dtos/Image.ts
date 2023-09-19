export default interface Image {
  id: String;
  type: String;
  name: String;
  language: String;
  fileExtension: String;
  fields: Fields;
  fileGroup: String;
  links: [Links];
}

interface Fields {
  metadata: Metadata;
  native: Native;
  renditions: [Renditions];
}

interface Native {
  links: [Links];
}

interface Metadata {
  width: String;
  height: String;
}

interface Links {
  href: String;
  rel: String;
  method: String;
  mediaType: String;
}

interface Renditions {
  name: String;
  id: String;
  formats: [Formats];
  type: String;
}

interface Formats {
  format: String;
  size: Number;
  mimeType: String;
  metadata: Metadata;
  links: [Links];
}
