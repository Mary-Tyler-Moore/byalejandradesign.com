// @flow
import type { Actions } from '../Cart/cart-actions';
import type { CollectionNode, TaxonomyNode } from '../Collections/types';

export type ImageNode = {
  localFile: {
    childImageSharp: {
      sizes: {},
    },
  },
};

export type ProductNode = {
  title: string,
  slug: string,
  id: string,
  collections: Array<CollectionNode> | CollectionNode,
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
    provided_dimensions: string,
    main_image: ImageNode,
    additional_images: Array<ImageNode>,
    video_type: string,
  },
};
