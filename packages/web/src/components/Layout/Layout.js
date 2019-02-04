import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import withSize from 'react-size-components';
import Footer from '../Footer';
import MainNav from '../MainNav';
import Header from '../Header';
// icons
import './library';
// styles
import 'normalize.css';
import './layout.sass';

const Size = React.createContext({
  mobile: false,
  orientation: true,
});

export const SizeProvider = Size.Provider;
export const SizeConsumer = Size.Consumer;

class Layout extends React.Component {
  get headerImage() {
    return this.props.headerImage
      ? this.props.headerImage
      : this.props.data.allWordpressAcfOptions.edges[0].node.options
          .default_header;
  }

  get navLayout() {
    return this.props.data.site.siteMetadata.navLayout;
  }

  get mainNav() {
    return this.navLayout.mainNav;
  }

  get footerNav() {
    return this.navLayout.footerNav;
  }

  render() {
    return (
      <React.Fragment>
        <div className="root">
          <MainNav mainNav={this.mainNav} sizes={this.props.sizes} />
          {this.props.headerImage && <Header headerImage={this.headerImage} />}
          <SizeProvider value={this.props.sizes}>
            <main className="mainContent">{this.props.children}</main>
          </SizeProvider>
          <Footer footerNav={this.footerNav} />
        </div>
        <div id="modal-root" />
      </React.Fragment>
    );
  }
}

const LAYOUT = graphql`
  query Layout {
    site {
      siteMetadata {
        navLayout {
          mainNav {
            link
            label
          }
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

const LayoutQuery = (props) => (
  <StaticQuery
    query={LAYOUT}
    render={(data) => <Layout data={data} {...props} />}
  />
);

export default withSize({
  mobile: true,
  orientation: true,
})(LayoutQuery);
