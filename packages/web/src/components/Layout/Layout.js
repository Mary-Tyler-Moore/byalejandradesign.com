import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import Footer from '../Footer';
import { MainNav, FooterNav } from '../Nav';
import Header from '../Header';
// icons
import './library';
// styles
import 'normalize.css';
import './layout.sass';

const SITE_DATA = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        siteUrl
        title
        subTitle
        description
        author
        navLayout {
          mainNav
          footerNav {
            link
            label
          }
        }
      }
    }
    allWordpressAcfOptions {
      edges {
        node {
          options {
            default_header {
              localFile {
                publicURL
                ...HeaderImageFragment
              }
            }
          }
        }
      }
    }
  }
`;

const Size = React.createContext({
  mobile: false,
  orientation: true,
});

class Layout extends React.Component {
  /** get the title from metadata */
  getTitle = (siteMetadata) => {
    const { title, subTitle } = siteMetadata;
    return `${title}: ${subTitle}${
      this.props.title ? ` | ${this.props.title}` : ``
    }`;
  };

  getCanonical = (siteMetadata) => {
    return `${siteMetadata.siteUrl}${this.props.location.pathname}`;
  };

  getDescription = (siteMetadata) => {
    return this.props.description
      ? this.props.descripion
      : siteMetadata.description;
  };

  getOGImage = (data) => {
    return `${data.site.siteMetadata.siteUrl}${
      this.getHeaderImage(data).localFile.publicURL
    }`;
  };

  getHeaderImage = (data) => {
    return this.props.headerImage
      ? this.props.headerImage
      : data.allWordpressAcfOptions.edges[0].node.options.default_header;
  };

  render() {
    return (
      <StaticQuery
        query={SITE_DATA}
        render={(data) => {
          const {
            site: { siteMetadata },
          } = data;

          return (
            <React.Fragment>
              <div className="root">
                <Helmet>
                  <title>{this.getTitle(siteMetadata)}</title>
                  <link
                    href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700,700i|Source+Sans+Pro:300,300i,600,600i"
                    rel="stylesheet"
                  />
                  <link
                    rel="canonical"
                    href={this.getCanonical(siteMetadata)}
                  />
                  />
                  <meta name="author" content={siteMetadata.author} />
                  <meta
                    name="description"
                    content={this.getDescription(siteMetadata)}
                  />
                  <meta itemprop="name" content={this.getTitle(siteMetadata)} />
                  <meta
                    itemprop="description"
                    content={this.getDescription(siteMetadata)}
                  />
                  <meta itemprop="image" content={this.getOGImage(data)} />
                  <meta name="og:site_name" content={siteMetadata.title} />
                  <meta name="og:type" content="article" />
                  <meta name="og:title" content={this.getTitle(siteMetadata)} />
                  <meta
                    name="og:description"
                    content={this.getDescription(siteMetadata)}
                  />
                  <meta
                    name="og:url"
                    content={this.getCanonical(siteMetadata)}
                  />
                  <meta name="og:image" content={this.getOGImage(data)} />
                  <meta name="fb:admins" content="934241763325153" />
                </Helmet>
                <MainNav
                  mainNav={siteMetadata.navLayout.mainNav}
                  sizes={this.props.sizes}
                />
                <Header headerImage={this.getHeaderImage(data)} />
                <Size.Provider value={this.props.sizes}>
                  <main className="mainContent">{this.props.children}</main>
                </Size.Provider>
                <Footer footerNav={siteMetadata.navLayout.footerNav} />
              </div>
              <div id="modal-root" />
            </React.Fragment>
          );
        }}
      />
    );
  }
}

export const SizeConsumer = Size.Consumer;

export default withSize({
  mobile: true,
  orientation: true,
})(Layout);
