// @flow
import type { Actions } from '../Cart/cart-actions';

export type NestedCategoryNode = {
  term_id: string,
  name: string,
  slug: string,
};

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
  acf: {
    display_title: string,
    quantity: number,
    price: number,
    sale_price: number,
    description: string,
    product_type: string,
    provided_dimensions: string,
    ceramic?: NestedCategoryNode,
    size?: NestedCategoryNode,
    collection?: NestedCategoryNode,
    additional_images: Array<ImageNode>,
    video_type: string,
    main_image: ImageNode,
  },
};
