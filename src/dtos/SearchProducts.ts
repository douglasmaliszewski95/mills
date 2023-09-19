import { Products } from "./Products";

export interface SearchProducts {
  records?: AttributesProduct[];
  totalNumRecs?: number;
  recsPerPage?: number;
  products: Products[];
  filters?: Filters[];
  refinementCrumbs?: RefinementCrumbs[];
  erro?: string;
}

export interface Filters {
  "@type": string;
  displayName: string;
  name: string;
  ancestors: any[];
  dimensionName: string;
  whyPrecedenceRuleFired: null;
  multiSelect: boolean;
  refinements: Refinements[];
}

export interface RefinementProperties {
  "DGraph.Spec": string;
}

export interface SiteState {
  validSite: boolean;
  contentPath: null;
  "@class": string;
  siteDisplayName: null;
  matchedUrlPattern: null;
  siteDefinition: null;
  siteId: string;
  properties: SiteStateProperties;
}
export interface Refinement {
  link: string;
  label: string;
}
export interface Refinements {
  contentPath: string;
  "@class": string;
  navigationState: string;
  siteRootPath: string;
  siteState: SiteState;
  count: number;
  link: string;
  label: string;
  properties: RefinementProperties;
  multiSelect: boolean;
  status: null;
}

interface SiteStateProperties {}

export interface RefinementCrumbs {
  removeAction: {
    contentPath: string;
    "@class": string;
    navigationState: string;
    siteState: {
      validSite: false;
      contentPath: null;
      "@class": string;
      siteDisplayName: null;
      matchedUrlPattern: null;
      siteDefinition: null;
      siteId: string;
      properties: {};
    };
    link: string;
    label: null;
  };
  "@class": string;
  count: number;
  displayName: string;
  label: string;
  ancestors: [];
  dimensionName: string;
  properties: {
    "DGraph.Spec": string;
  };
  multiSelect: boolean;
}

export interface AttributesProduct {
  attributes: {
    "product.daysAvailable": [string];
    "product.longDescription": [string];
    "product.seoUrlSlug": [string];
    "sku.listingId": [string];
    "product.configurable": [string];
    "product.displayName": [string];
    "sku.onSale": [string];
    "product.seoDescription": [string];
    "product.dateAvailable": [string];
    "product.primaryImageAltText": [string];
    "product.category": [string];
    "product.description": [string];
    "product.seoKeywords": [string];
    "product.primaryThumbImageURL": [string];
    "product.seoTitle": [string];
    "sku.availabilityStatus": [string];
    "sku.url": [string];
    "product.creationDate": [string];
    "parentCategory.displayName": [string];
    "product.baseUrl": [string];
    "product.primaryLargeImageURL": [string];
    "sku.repositoryId": [string];
    "product.primaryImageTitle": [string];
    "record.collection": [string];
    "sku.baseUrl": [string];
    "record.type": [string];
    "product.largeImageURLs": [string];
    "product.route": [string];
    "product.primaryFullImageURL": [string];
    "record.urn": [string];
    "product.catalogId": [string];
    "record.id": [string];
    "product.repositoryId": [string];
    "product.fullImageURLs": [string];
    "product.mediumImageURLs": [string];
    "product.notForIndividualSale": [string];
    "sku.translations.repositoryId": [string];
    "product.thumbImageURLs": [string];
    "product.url": [string];
    "sku.active": [string];
    "product.productImagesMetadata": [string];
    "product.primarySmallImageURL": [string];
    "product.sourceImageURLs": [string];
    "sku.creationDate": [string];
    "sku.listingOptionIndex": [string];
    "product.primaryMediumImageURL": [string];
    "product.active": [string];
    "product.smallImageURLs": [string];
  };
}
