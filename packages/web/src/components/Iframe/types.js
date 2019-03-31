/** @flow */
export type Props = {
  sizes: {
    component: {
      width: number,
    },
  },
  childRef: () => HTMLElement<T>,
  ratio: number,
};
