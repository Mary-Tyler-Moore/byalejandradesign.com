import type { ImageNode } from '../Product/types';

export type CollectionNode = {
  name: string,
  id: string,
  description: string,
  acf: {
    subtitle: string,
    image: ImageNode,
  },
};

export type CollectionEdges = Array<{ node: CollectionNode }>;
