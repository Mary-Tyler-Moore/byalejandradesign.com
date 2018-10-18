declare module 'data' {
  declare export type TaxonomyNode = {
    name: string,
    id: string,
    description: string,
    slug: string,
  };

  declare export type CollectionNode = {
    ...TaxonomyNode,
    acf: {
      image: ImageNode,
      header_image: ImageNode,
    },
  };

  declare export type CollectionEdges = Array<{ node: CollectionNode }>;

  declare export type allWordpressWpCollections = { edges: CollectionEdges };

  declare export type ImageNode = {
    localFile: {
      childImageSharp: {
        fixed?: {},
        fluid?: {},
      },
    },
  };

  declare export type ProductNode = {
    title: string,
    slug: string,
    id: string,
    wordpress_id: string,
    collections?: Array<CollectionNode> | CollectionNode,
    ceramics?: Array<TaxonomyNode> | TaxonomyNode,
    sizes?: Array<TaxonomyNode> | TaxonomyNode,
    paintings?: Array<TaxonomyNode> | TaxonomyNode,
    acf: {
      display_title: string,
      quantity: number,
      price: number,
      sale_price: number,
      description: string,
      product_type: string,
      dimensions: {
        length: string,
        width: string,
        height: string,
      },
      main_image: ImageNode,
      additional_images: Array<ImageNode> | null,
      video_type: string,
    },
  };

  declare export type ProductEdges = Array<{ node: ProductNode }>;

  declare export type allWordpressWpShop = { edges: ProductEdges };
}
