import { Products } from "./Products"

export interface SearchProducts {
  records?: AttributesProduct[]
  totalNumRecs?: number
  recsPerPage?: number
  products: Products[]
  filters?: Filters[]
  erro?: string
}

interface Filters {
  displayName: string
  refinements: Refinements[]
}

interface Refinements {
  link: string
  label: string
}

export interface AttributesProduct {
  attributes: {
    "product.daysAvailable": [string]
    "product.longDescription": [string]
    "product.seoUrlSlug": [string]
    "sku.listingId": [string]
    "product.configurable": [string]
    "product.displayName": [string]
    "sku.onSale": [string]
    "product.seoDescription": [string]
    "product.dateAvailable": [string]
    "product.primaryImageAltText": [string]
    "product.category": [string]
    "product.description": [string]
    "product.seoKeywords": [string]
    "product.primaryThumbImageURL": [string]
    "product.seoTitle": [string]
    "sku.availabilityStatus": [string]
    "sku.url": [string]
    "product.creationDate": [string]
    "parentCategory.displayName": [string]
    "product.baseUrl": [string]
    "product.primaryLargeImageURL": [string]
    "sku.repositoryId": [string]
    "product.primaryImageTitle": [string]
    "record.collection": [string]
    "sku.baseUrl": [string]
    "record.type": [string]
    "product.largeImageURLs": [string]
    "product.route": [string]
    "product.primaryFullImageURL": [string]
    "record.urn": [string]
    "product.catalogId": [string]
    "record.id": [string]
    "product.repositoryId": [string]
    "product.fullImageURLs": [string]
    "product.mediumImageURLs": [string]
    "product.notForIndividualSale": [string]
    "sku.translations.repositoryId": [string]
    "product.thumbImageURLs": [string]
    "product.url": [string]
    "sku.active": [string]
    "product.productImagesMetadata": [string]
    "product.primarySmallImageURL": [string]
    "product.sourceImageURLs": [string]
    "sku.creationDate": [string]
    "sku.listingOptionIndex": [string]
    "product.primaryMediumImageURL": [string]
    "product.active": [string]
    "product.smallImageURLs": [string]
  }
}