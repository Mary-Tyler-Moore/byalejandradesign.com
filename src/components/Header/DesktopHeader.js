import * as React from 'react';
import Img from 'gatsby-image';
import './header.sass';
import ByAlejandra from './ByAlejandra.js';

import type { ImageNode } from '../Product/types';

type Props = {
  headerImage: ImageNode,
};

class DesktopHeader extends React.PureComponent<Props> {
  render() {
    return (
      <header className="header">
        <figure className="header_imgContainer">
          {this.props.headerImage ? (
            <Img
              className="header_img"
              fluid={this.props.headerImage.localFile.childImageSharp.fluid}
            />
          ) : null}
        </figure>
        <figure className="header_logo">
          <ByAlejandra />
        </figure>
      </header>
    );
  }
}

export default DesktopHeader;
