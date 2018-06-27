import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import { MainNav, FooterNav } from '../components/Nav';
import Header from '../components/Header';
// fonts
import WebFont from 'webfontloader';
// styles
import 'normalize.css';
import './index.sass';

const fonts = {
  google: {
    families: ['Work+Sans:300,400,500,700,800,900'],
  },
};

WebFont.load(fonts);

const Layout = ({ children, data, sizes }) => (
  <div className="root">
    <Helmet
      title={
        data.site.siteMetadata.title + ': ' + data.site.siteMetadata.subTitle
      }
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <MainNav
      maxWidth={data.site.siteMetadata.design.maxWidth}
      mainNav={data.site.siteMetadata.navLayout.mainNav}
      sizes={sizes}
    />
    <Header edges={data.allWordpressWpHeaders.edges} />
    <main
      style={{
        maxWidth: `${data.site.siteMetadata.design.maxWidth}px`,
        minHeight: '100vh',
      }}
      className="mainContent"
    >
      {children()}
    </main>
    <FooterNav
      maxWidth={data.site.siteMetadata.design.maxWidth}
      footerNav={data.site.siteMetadata.navLayout.footerNav}
      sizes={sizes}
    />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default withSize({
  mobile: true,
  orientation: true,
  measureWindow: true,
})(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        subTitle
        navLayout {
          mainNav
          footerNav
        }
        design {
          maxWidth
        }
      }
    }
    allWordpressWpHeaders {
      edges {
        node {
          acf {
            image {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 1650) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
