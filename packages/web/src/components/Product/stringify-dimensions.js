/** @flow */
type Dimensions = {
  length?: string,
  width?: string,
  height?: string,
};

// const unitString = (dimension: string) => (dimension ? `${dimension}"` : '');

const stringifyDimensions = (dimensions: Dimensions) => {
  const { length, width, height } = dimensions || {};

  return `${length ? `${length}" x ` : ``}${
    width && height ? `${width}" x ` : width ? `${width}"` : ``
  }${height ? `${height}"` : ``}`;
};

export default stringifyDimensions;
