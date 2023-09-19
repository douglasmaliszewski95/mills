export interface ProductsList {
  repositoryId: string;
}

export interface Products {
  erro: string;
  products: ProductOCC[];
}

export interface RelatedProducts {
  largeImage: null;
  x_alimentacao: string;
  listVolumePrice: null;
  excludeFromSitemap: boolean;
  listPrices: ListPrices;
  type: string;
  seoMetaInfo: SEOMetaInfo;
  largeImageURLs: string[];
  coreProduct: boolean;
  listVolumePrices: ListPrices;
  shippable: boolean;
  addOnProducts: any[];
  derivedSalePriceFrom: string;
  primaryImageAltText: string;
  id: string;
  x_linkManual: string;
  brand: string;
  salePriceEndDate: null;
  x_emissoMdiaKgDeCOH: string;
  filteredAddOnProducts: any[];
  defaultProductListingSku: null;
  assetable: boolean;
  secondaryCurrencyShippingSurcharge: null;
  unitOfMeasure: null;
  targetAddOnProducts: any[];
  primaryMediumImageURL: string;
  seoKeywordsDerived: string;
  seoUrlSlugDerived: string;
  active: boolean;
  thumbImageURLs: string[];
  x_tipo: string;
  route: string;
  relatedArticles: any[];
  x_linkInfoEquipamento: string;
  mediumImageURLs: string[];
  primarySourceImageURL: string;
  sourceImageURLs: string[];
  primarySmallImageURL: string;
  x_labelSvg: string;
  x_capacidadeDoTanqueL: string;
  primaryThumbImageURL: string;
  nonreturnable: boolean;
  directCatalogs: any[];
  displayName: string;
  seoDescriptionDerived: string;
  description: string;
  salePrices: ListPrices;
  primaryFullImageURL: string;
  x_capacidadeDeCargaKg: string;
  productVariantOptions: null;
  seoTitleDerived: string;
  x_peso: number;
  x_pressoDoSoloKgcm: number;
  primaryLargeImageURL: string;
  x_rampaMxima: string;
  smallImageURLs: string[];
  derivedShippingSurchargeFrom: string;
  shippingSurcharges: ListPrices;
  isOnSale: null;
  filteredSKUs: DSkUs[];
  saleVolumePrices: ListPrices;
  primaryImageTitle: string;
  saleVolumePrice: null;
  childSKUs: DSkUs[];
  salePriceStartDate: null;
  relatedMediaContent: any[];
  lastModifiedDate: Date;
  salePrice: number;
  x_categoria: string;
  fullImageURLs: string[];
  derivedDirectCatalogs: any[];
  x_alcanceHorizontalM: string;
  x_consumoCombustvelLhminMx: string;
  wasPriceRange: null;
  variantValuesOrder: null;
  notForIndividualSale: boolean;
  x_alturaDeTrabalhoM: string;
  repositoryId: string;
  derivedListPriceFrom: string;
  shippingSurcharge: number;
  defaultParentCategory: null;
  productImagesMetadata: ProductImagesMetadatum[];
  filteredRelatedProducts: null;
  priceRange: null;
  configurable: boolean;
  listPrice: number;
  parentCatalogs: ParentCatalog[];
}

export interface DSkUs {
  dynamicPropertyMapLong: ProductImagesMetadatum;
  bundleLinks: any[];
  largeImage: null;
  smallImage: null;
  listVolumePrice: null;
  onlineOnly: boolean;
  listPrices: ListPrices;
  configurationMetadata: any[];
  largeImageURLs: any[];
  productLine: null;
  listVolumePrices: ListPrices;
  derivedSalePriceFrom: string;
  model: null;
  barcode: null;
  salePriceEndDate: null;
  images: any[];
  secondaryCurrencyShippingSurcharge: null;
  unitOfMeasure: null;
  primaryMediumImageURL: null;
  dynamicPropertyMapBigString: ProductImagesMetadatum;
  active: boolean;
  thumbImageURLs: any[];
  mediumImageURLs: any[];
  primarySourceImageURL: null;
  sourceImageURLs: any[];
  primarySmallImageURL: null;
  productFamily: null;
  primaryThumbImageURL: null;
  nonreturnable: boolean;
  displayName: null;
  salePrices: ListPrices;
  primaryFullImageURL: null;
  productListingSku: null;
  primaryLargeImageURL: null;
  derivedOnlineOnly: boolean;
  smallImageURLs: any[];
  derivedShippingSurchargeFrom: string;
  shippingSurcharges: ListPrices;
  thumbnailImage: null;
  discountable: boolean;
  saleVolumePrices: ListPrices;
  saleVolumePrice: null;
  salePriceStartDate: null;
  quantity: null;
  lastModifiedDate: Date;
  salePrice: number;
  fullImageURLs: any[];
  variantValuesOrder: ProductImagesMetadatum;
  soldAsPackage: boolean;
  listingSKUId: null;
  repositoryId: string;
  derivedListPriceFrom: string;
  shippingSurcharge: number;
  configurable: boolean;
  listPrice: number;
}

export interface ProductImagesMetadatum {}

export interface ListPrices {
  defaultPriceGroup: number | null;
}

export interface ParentCatalog {
  displayName: string;
  repositoryId: string;
}

export interface SEOMetaInfo {
  seoDescription: string;
  repositoryId: string;
  seoKeywords: string;
  seoTitle: string;
  seoUrlSlug: string;
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
  relatedProducts: RelatedProducts[];
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
