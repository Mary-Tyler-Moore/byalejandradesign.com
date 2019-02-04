import * as React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import ByAlejandra from './ByAlejandra.js';
// sass
import './header.sass';
// types
import type { ImageNode } from '@byalejandradesign/data-objects';

type Props = {
  image: ImageNode,
};

class DesktopHeader extends React.PureComponent<Props> {
  static defaultProps = {
    filter: 0,
  };

  render() {
    return (
      <header className="header">
        <div
          className="header_imgFilter"
          style={{ opacity: this.props.filter }}
        />
        <figure className="header_imgContainer">
          {this.props.image.localFile ? (
            <Img
              className="header_img"
              fluid={this.props.image.localFile.childImageSharp.fluid}
            />
          ) : null}
        </figure>
        {this.props.children && (
          <section className="header_centered">{this.props.children}</section>
        )}
        <figure className="header_logo">
          <ByAlejandra />
        </figure>
      </header>
    );
  }
}

export const HEADER_IMAGE_FRAGMENT = graphql`
  fragment HeaderImageFragment on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 70) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const DEFAULT_HEADER_IMAGE = graphql`
  query DefaultHeaderImage {
    allWordpressAcfOptions {
      edges {
        node {
          options {
            default_header {
              localFile {
                ...HeaderImageFragment
              }
            }
          }
        }
      }
    }
  }
`;

const defaultHeaderImage = (data) =>
  data.allWordpressAcfOptions.edges[0].node.options.default_header;

const HeaderQuery = ({ image, ...props }) =>
  image ? (
    <DesktopHeader image={image} {...props} />
  ) : (
    <StaticQuery
      query={DEFAULT_HEADER_IMAGE}
      render={(data) => (
        <DesktopHeader image={defaultHeaderImage(data)} {...props} />
      )}
    />
  );

export default HeaderQuery;
