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
  image: StaticImageData | Image;
  model: string;
  description: string;
  specs: Spec[];
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
