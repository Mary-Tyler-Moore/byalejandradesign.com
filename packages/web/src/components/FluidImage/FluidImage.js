/** @flow */
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
// styles
import './fluid-image.sass';

export type FluidImageProps = {
  localFile: {
    childImageSharp: {
      fluid?: {},
    },
  },
  to: string,
  className: string,
};

const FluidImageLink = ({ children, to }) =>
  to ? (
    <Link to={to} className="fluidImage_link">
      {children}
    </Link>
  ) : (
    children
  );

const FluidImage = ({ localFile, to, className }: FluidImageProps) => (
  <FluidImageLink to={to}>
    <figure
      className={`fluidImage${to && ' fluidImage_clickable'}${' ' + className}`}
    >
      <Img
        className="fluidImage_gatsby"
        fluid={localFile.childImageSharp.fluid}
      />
    </figure>
  </FluidImageLink>
);

FluidImage.defaultProps = {
  className: '',
  to: '',
};

/** Default image sharp fragment for wp media */
export const query = graphql`
  fragment FluidImageFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        fluid(maxWidth: 1200, maxHeight: 900) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default FluidImage;
