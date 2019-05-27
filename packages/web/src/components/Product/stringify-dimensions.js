/** @flow */
type Dimensions = {
  length?: string,
  width?: string,
  height?: string,
};

const stringifyDimensions = (dimensions: Dimensions) => {
  const { length, width, height } = dimensions || {};

  return `${length ? `${length}" x ` : ``}${
    width && height ? `${width}" x ` : width ? `${width}"` : ``
  }${height ? `${height}"` : ``}`;
};

export default stringifyDimensions;
