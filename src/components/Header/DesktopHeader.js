// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import { BEM } from 'njmyers-component-library';
import './header.sass';

type Edge = {
  node: {
    acf: {
      image: {
        localFile: {
          childImageSharp: {
            fluid: {},
          },
        },
      },
    },
  },
};

type Props = {
  edges: Array<Edge>,
};

class DesktopHeader extends React.PureComponent<Props> {
  getActiveIndex = () => {
    return Math.floor(Math.random() * this.props.edges.length);
  };

  getActiveImage = () => {
    const { node } = this.props.edges[this.getActiveIndex()];
    return node.acf.image.localFile.childImageSharp.fluid;
  };

  render() {
    return (
      <BEM block="header">
        <div element="imgContainer">
          <Img className="header_img" fluid={this.getActiveImage()} />
        </div>
      </BEM>
    );
  }
}

export default DesktopHeader;
