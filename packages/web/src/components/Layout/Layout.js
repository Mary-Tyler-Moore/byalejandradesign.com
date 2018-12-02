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
        title
        subTitle
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
                ...HeaderImageFragment
              }
            }
          }
        }
      }
    }
  }
`;

class Layout extends React.Component {
  /** get the metadata object */
  getSiteMetadata = (data) => data.site.siteMetadata;

  /** get the title from metadata */
  getTitle = (data) => {
    const { title, subTitle } = this.getSiteMetadata(data);
    return `${title}: ${subTitle}`;
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
        render={(data) => (
          <React.Fragment>
            <div className="root">
              <Helmet
                title={this.getTitle(data)}
                meta={[
                  { name: 'description', content: 'Sample' },
                  { name: 'keywords', content: 'sample, something' },
                ]}
              >
                <link
                  href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700,700i|Source+Sans+Pro:300,300i,600,600i"
                  rel="stylesheet"
                />
              </Helmet>
              <MainNav
                mainNav={data.site.siteMetadata.navLayout.mainNav}
                sizes={this.props.sizes}
              />
              <Header headerImage={this.getHeaderImage(data)} />
              <main className="mainContent">{this.props.children}</main>
              <Footer footerNav={data.site.siteMetadata.navLayout.footerNav} />
            </div>
            <div id="modal-root" />
          </React.Fragment>
        )}
      />
    );
  }
}

export default withSize({
  mobile: true,
  orientation: true,
  measureWindow: true,
})(Layout);
