import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import { MainNav, FooterNav } from '../components/Nav';
import Header from '../components/Header';
import Fonts from '../components/Fonts';
// styles
import 'normalize.css';
import './index.sass';

const Layout = ({ children, data, sizes }) => (
  <div className="root">
    <Fonts />
    <Helmet
      title={
        data.site.siteMetadata.title + ': ' + data.site.siteMetadata.subTitle
      }
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900"
        rel="stylesheet"
      />
    </Helmet>
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
