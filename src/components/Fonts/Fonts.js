import * as React from 'react';

const fonts = {
  google: {
    families: ['Work+Sans:300,400,500,700,800,900'],
  },
};

class Fonts extends React.Component {
  componentDidMount() {
    // Promise.resolve(import('webfontloader'));
    // WebFont.load(fonts);
  }

  render() {
    return null;
  }
}

export default Fonts;
