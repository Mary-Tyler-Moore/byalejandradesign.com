import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import classNames from 'classnames';
import Img from 'gatsby-image';
import ByAlejandra from './ByAlejandra.js';
// sass
import './hero.sass';

class Hero extends React.PureComponent<Props> {
  static defaultProps = {
    filter: 0,
    fill: 'half',
  };

  get localFile() {
    return this.props.image.localFile;
  }

  get className() {
    const { fill } = this.props;

    return classNames({
      hero: true,
      'hero-half': fill === 'half',
      'hero-full': fill === 'full',
      'hero-twoThirds': fill === 'twoThirds',
    });
  }

  render() {
    return (
      <header className={this.className}>
        <div
          className="hero_imgFilter"
          style={{ opacity: this.props.filter }}
        />
        <figure className="hero_imgContainer">
          {this.localFile ? (
            <Img
              className="hero_img"
              fluid={this.localFile.childImageSharp.fluid}
            />
          ) : null}
        </figure>
        {this.props.children && (
          <section className="hero_centered">{this.props.children}</section>
        )}
        <figure className="hero_logo">
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
    <Hero image={image} {...props} />
  ) : (
    <StaticQuery
      query={DEFAULT_HEADER_IMAGE}
      render={(data) => <Hero image={defaultHeaderImage(data)} {...props} />}
    />
  );

export default HeaderQuery;
