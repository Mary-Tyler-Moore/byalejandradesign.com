import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
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
          return (
            <React.Fragment>
              <div className="root">
                <MainNav
                  mainNav={data.site.siteMetadata.navLayout.mainNav}
                  sizes={this.props.sizes}
                />
                <Header headerImage={this.getHeaderImage(data)} />
                <Size.Provider value={this.props.sizes}>
                  <main className="mainContent">{this.props.children}</main>
                </Size.Provider>
                <Footer
                  footerNav={data.site.siteMetadata.navLayout.footerNav}
                />
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
