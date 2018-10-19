/** @flow */
export type TaxonomyNode = {
  name: string,
  id: string,
  description: string,
  slug: string,
};

export type CollectionNode = {
  acf: {
    image: ImageNode,
    header_image: ImageNode,
  },
} & TaxonomyNode;

export type CollectionEdges = Array<{ node: CollectionNode }>;

export type allWordpressWpCollections = { edges: CollectionEdges };

export type ImageNode = {
  localFile: {
    childImageSharp: {
      fixed?: {},
      fluid?: {},
    },
  },
};

export type ProductNode = {
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

export type ProductEdges = Array<{ node: ProductNode }>;

export type allWordpressWpShop = { edges: ProductEdges };
