export default interface SearchCMS {
  id: String;
  type: String;
  name: string;
  language: String;
  fileExtension: String;
  fields: Fields;
  fileGroup: String;
  description: string;
  mobileObj: SearchCMS;
}

interface Fields {
  metadata: Metadata;
  native: Native;
  renditions: [Renditions];
  alt_attribute: string
  content_area: string
  content_order: string
  content_page: string
  content_text: string
  content_title: string
  content_subtitle: string
  content_text_json: [Json]
  text: string
  title: string
  subtitle: string[]
  text_field: string[]
  mobile: boolean
  buttonText: string[]
  button_text: string[]
  hrefButton: string[]
  href_attribute: string
}

interface Json {
  title: String;
  subtitle: String;
}

interface Native {
  links: [Links];
}

interface Metadata {
  width: String;
  height: String;
}

interface Links {
  href: string;
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
