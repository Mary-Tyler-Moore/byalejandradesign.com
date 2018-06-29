import type { ImageNode } from '../Product/types';

export type TaxonomyNode = {
  name: string,
  id: string,
  description: string,
  slug: string,
};

export type CollectionNode = {
  ...TaxonomyNode,
  acf?: {
    subtitle: string,
    image: ImageNode,
  },
};

export type CollectionEdges = Array<{ node: CollectionNode }>;
