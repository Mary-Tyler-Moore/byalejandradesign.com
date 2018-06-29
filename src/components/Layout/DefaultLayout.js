import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import { MainNav, FooterNav } from '../Nav';
import Header from '../Header';
// import Fonts from '../Fonts';
// styles
import 'normalize.css';
import './index.sass';

const Layout = ({ children, sizes }) => (
  <StaticQuery
    query={graphql`
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
              contentPadding
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
                      fluid(maxWidth: 1650) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <div className="root">
        <Helmet
          title={
            data.site.siteMetadata.title +
            ': ' +
            data.site.siteMetadata.subTitle
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
          contentPadding={data.site.siteMetadata.design.contentPadding}
          mainNav={data.site.siteMetadata.navLayout.mainNav}
          sizes={sizes}
        />
        <Header edges={data.allWordpressWpHeaders.edges} />
        <main
          style={{
            maxWidth: `${data.site.siteMetadata.design.maxWidth}px`,
            minHeight: '100vh',
            padding: `0 ${data.site.siteMetadata.design.contentPadding}px`,
          }}
          className="mainContent"
        >
          {children}
        </main>
        <FooterNav
          maxWidth={data.site.siteMetadata.design.maxWidth}
          footerNav={data.site.siteMetadata.navLayout.footerNav}
          sizes={sizes}
        />
      </div>
    )}
  />
);

export default withSize({
  mobile: true,
  orientation: true,
  measureWindow: true,
})(Layout);
