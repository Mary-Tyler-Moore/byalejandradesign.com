import * as React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import './header.sass';
import ByAlejandra from './ByAlejandra.js';

import type { ImageNode } from '@byalejandradesign/data-objects';

type Props = {
  headerImage: ImageNode,
  verticalPostion: string,
};

class DesktopHeader extends React.PureComponent<Props> {
  render() {
    return (
      <header className="header">
        <figure className="header_imgContainer">
          {this.props.headerImage.localFile ? (
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

export const query = graphql`
  fragment HeaderImageFragment on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 70) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default DesktopHeader;
