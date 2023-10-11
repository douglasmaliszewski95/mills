export interface FormattedResponseProps {
  image?: string;
  paragraphText?: string;
  title?: string;
  backgroundImage?: string;
  header?: string;
  bgImage?: string;
  bgImageMobile?: string;
  buttonText?: string;
  headerText?: string;
  cards?: CardListProps[];
  cardList?: CardListProps[];
}

export interface CardListProps {
  image?: string;
  headerText?: string;
  order: number;
  imageMobile?: string;
  buttonText?: string;
}

export interface SegmentsProps {
  mobileObj: {
    description: string;
    language: string;
    mimeType: string;
    updatedDate: {
      value: string;
      timezone: string;
    };
    type: string;
    typeCategory: string;
    createdDate: {
      value: string;
      timezone: string;
    };
    taxonomies: {
      items: any;
    };
    fileExtension: string;
    name: string;
    renditions: {
      items: any;
    };
    links: LinkCMSProps[];
    id: string;
    fileGroup: string;
    fields: FieldsProps;
    slug: string;
  };
  description: string;
  language: string;
  mimeType: string;
  updatedDate: {
    value: string;
    timezone: string;
  };
  type: string;
  typeCategory: string;
  createdDate: {
    value: string;
    timezone: string;
  };
  taxonomies: {
    items: [];
  };
  fileExtension: string;
  name: string;
  renditions: {
    items: any;
  };
  links: [
    {
      href: string;
      rel: string;
      method: string;
      mediaType: string;
    }
  ];
  id: string;
  fileGroup: string;
  fields: FieldsProps;
  slug: string;
}

interface LinkCMSProps {
  href: string;
  rel: string;
  method: string;
  mediaType: string;
}
interface FieldsProps {
  metadata: {
    width: string;
    height: string;
  };
  alt_attribute: any;
  content_page: string;
  content_text: any;
  mobile: boolean;
  content_order: number;
  mimeType: string;
  content_title: string;
  content_subtitle: any;
  size: number;
  native: {
    links: LinkCMSProps[];
  };
  renditions: [
    {
      name: string;
      id: string;
      formats: [
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        },
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        }
      ];
      type: string;
    },
    {
      name: string;
      id: string;
      formats: [
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        },
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        }
      ];
      type: string;
    },
    {
      name: string;
      id: string;
      formats: [
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        },
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        }
      ];
      type: string;
    },
    {
      name: string;
      id: string;
      formats: [
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        },
        {
          format: string;
          size: number;
          mimeType: string;
          metadata: {
            width: string;
            height: string;
          };
          links: LinkCMSProps[];
        }
      ];
      type: string;
    }
  ];
  fileType: string;
  content_area: string;
  href_attribute: string;
}
