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

const FluidImage = (props: FluidImageProps) => {
  const { localFile, to, className, children } = props;
  return (
    <FluidImageLink to={to}>
      <figure
        className={`fluidImage${to && ' fluidImage_clickable'}${' ' +
          className}`}
      >
        {localFile && (
          <Img
            className="fluidImage_gatsby"
            fluid={localFile.childImageSharp.fluid}
          />
        )}
        {children && (
          <figcaption className="fluidImage_children">{children}</figcaption>
        )}
      </figure>
    </FluidImageLink>
  );
};

FluidImage.defaultProps = {
  className: '',
  to: '',
};

/** Default image sharp fragment for wp media */
export const query = graphql`
  fragment FluidImageFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        id
        fluid(maxWidth: 800, maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default FluidImage;
