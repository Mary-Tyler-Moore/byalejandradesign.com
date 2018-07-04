
import * as React from 'react';
import Img from 'gatsby-image';
import { BEM } from 'njmyers-component-library';
import './header.sass';
import ByAlejandra from './ByAlejandra.js';

import type { ImageNode } from '../Product/types';

type Props = {
  headerImage: ImageNode,
};

class DesktopHeader extends React.PureComponent<Props> {
  render() {
    return (
      <BEM block="header">
        <header>
          <figure element="imgContainer">
            {this.props.headerImage ? (
              <Img
                className="header_img"
                fluid={this.props.headerImage.localFile.childImageSharp.fluid}
              />
            ) : null}
          </figure>
          <figure element="logo">
            <ByAlejandra />
          </figure>
        </header>
      </BEM>
    );
  }
}

export default DesktopHeader;
