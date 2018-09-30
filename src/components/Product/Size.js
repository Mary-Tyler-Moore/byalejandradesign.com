import * as React from 'react';
import './size.sass';

const abbreviation = (sizes) => {
  if (Array.isArray(sizes)) {
    if (sizes.length < 1) {
      return '';
    } else {
      switch (sizes[0].slug) {
        case 'extra-large':
          return 'XL';
        case 'large':
          return 'L';
        case 'medium':
          return 'M';
        case 'small':
          return 'S';
        case 'extra-small':
          return 'XS';
        default:
          return 'M';
      }
    }
  } else {
    return '';
  }
};

const Size = ({ node }) => (
  <span className="size">{abbreviation(node.sizes)}</span>
);

export default Size;
