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
  to?: string,
};

const FluidImage = ({ localFile, to }: FluidImageProps) =>
  to ? (
    <Link to={to} className="fluidImage_link">
      <figure className="fluidImage">
        <Img
          className="fluidImage_gatsby"
          fluid={localFile.childImageSharp.fluid}
        />
      </figure>
    </Link>
  ) : (
    <figure className="fluidImage">
      <Img
        className="fluidImage_gatsby"
        fluid={localFile.childImageSharp.fluid}
      />
    </figure>
  );

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
