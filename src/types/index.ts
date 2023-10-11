import { StaticImageData } from "next/image";

export interface Image {
  blurHeight: number;
  blurWidth: number;
  height: number;
  src: string;
  width: number;
}

interface Spec {
  name: string;
  value: string;
}

export interface Product {
  id?: string;
  image: string;
  model: string;
  description: string;
  specs: Spec[];
  route: string;
  type: string;
}

export type Inputs = {
  example: string;
  exampleRequired: string;
};

export interface RequestQuoteFormType {
  name: string;
  email: string;
  phone: string;
  comment?: string;
}

export interface ArrowProps {
  onClick?: () => void;
  width?: number;
  height?: number;
  customProps?: string;
  arrowBorderRightDistance?: string;
  arrowColor?: "white" | "orange" | "green";
}

export interface ProductsList {
  repositoryId: string;
}

export interface ProductOCC {
  orderable: null;
  orderLimit: null;
  listPrices: {
    defaultPriceGroup: number;
  };
  type: string;
  coreProduct: boolean;
  shippable: boolean;
  primaryImageAltText: string;
  id: string;
  brand: string;
  parentCategories: [ProductsList];
  x_emissoMdiaKgDeCOH: string;
  x_emissaoMedia: string;
  x_pesoOperacional: string;
  x_potenciaDoMotor: string;
  x_cabine: string;
  x_capacidadeDoTanque: string;
  x_potenciaStandByKVA: string;
  x_potenciaStandByKW: string;
  x_potenciaPrimeKVA: string;
  x_potenciaPrimeKW: string;
  x_motor: string;
  height: number;
  defaultProductListingSku: null;
  assetable: boolean;
  unitOfMeasure: null;
  targetAddOnProducts: [];
  seoKeywordsDerived: string;
  seoUrlSlugDerived: string;
  active: boolean;
  thumbImageURLs: [string];
  route: string;
  relatedArticles: [];
  mediumImageURLs: [string];
  primarySourceImageURL: string;
  sourceImageURLs: [string];
  x_capacidadeDoTanqueL: string;
  primaryThumbImageURL: string;
  nonreturnable: boolean;
  displayName: string;
  seoDescriptionDerived: string;
  primaryFullImageURL: string;
  x_capacidadeDeCargaKg: string;
  seoTitleDerived: string;
  x_peso: number;
  x_pressoDoSoloKgcm: number;
  primaryLargeImageURL: string;
  x_rampaMxima: string;
  filteredSKUs: [];
  saleVolumePrices: {
    defaultPriceGroup: null;
  };
  childSKUs: [];
  salePriceStartDate: null;
  salePrice: number;
  x_alcanceHorizontalM: string;
  x_consumoCombustvelLhminMx: string;
  notForIndividualSale: boolean;
  x_alturaDeTrabalhoM: string;
  dateAvailable: string;
  derivedListPriceFrom: string;
  width: number;
  daysAvailable: number;
  listPrice: number;
  parentCatalogs: [
    {
      displayName: string;
      repositoryId: string;
    }
  ];
  largeImage: null;
  x_alimentacao: string;
  listVolumePrice: null;
  keywords: [];
  excludeFromSitemap: boolean;
  relatedProducts: null;
  onlineOnly: boolean;
  seoMetaInfo: {
    seoDescription: string;
    repositoryId: string;
    seoKeywords: string;
    seoTitle: string;
    seoUrlSlug: string;
  };
  largeImageURLs: [string];
  listVolumePrices: {
    defaultPriceGroup: null;
  };
  addOnProducts: [];
  derivedSalePriceFrom: string;
  links: [
    {
      rel: string;
      href: string;
    }
  ];
  x_linkManual: string;
  salePriceEndDate: null;
  primaryMediumImageURL: string;
  weight: null;
  taxCode: null;
  creationDate: string;
  x_tipo: string;
  arrivalDate: null;
  x_linkInfoEquipamento: string;
  parentCategory: {
    repositoryId: string;
  };
  primarySmallImageURL: string;
  x_labelSvg: string;
  longDescription: string;
  description: string;
  salePrices: {
    defaultPriceGroup: number;
  };
  smallImageURLs: [string];
  derivedShippingSurchargeFrom: string;
  shippingSurcharges: {
    defaultPriceGroup: number;
  };
  discountable: boolean;
  primaryImageTitle: string;
  saleVolumePrice: null;
  relatedMediaContent: [];
  lastModifiedDate: string;
  x_categoria: string;
  fullImageURLs: [string];
  length: number;
  variantValuesOrder: {};
  productImages: [
    {
      path: string;
      metadata: {};
      repositoryId: string;
      name: string;
      url: string;
      tags: [];
    }
  ];
  repositoryId: string;
  shippingSurcharge: number;
  productImagesMetadata: [{}];
  configurable: boolean;
  erro: string;
}

export interface ImageCMS {
  fields: {
    alt_attribute: string | null;
    content_area: string | null;
    content_subtitle: string | null;
    content_text: string | null;
    content_title: string | null;
    content_order?: string | null;
    href_attribute?: string | null;
    subtitle?: string[];
    title: string | null;
    text_field: string[] | null;
    buttonText?: string[] | null;
    button_text?: string[] | null;
  };
  description: string;
  name: string;
  mobileObj?: ImageCMS | undefined;
  id?: number | string;
}

export interface TextCMS {
  fields: {
    alt_attribute: string | null;
    content_area: string | null;
    content_subtitle: string | null;
    content_text: string | null;
    content_title: string | null;
    content_text_json:
      | {
          title: string;
          text: string;
        }[]
      | null;
    text_field: string[] | null;
    title: string | null;
    hrefButton?: string[] | [];
    buttonText?: string[] | [];
    subtitle: string[] | [];
  };
  description: string;
  name: string;
}
