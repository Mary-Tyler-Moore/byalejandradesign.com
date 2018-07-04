import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import { MainNav, FooterNav } from '../Nav';
import Header from '../Header';
// styles
import 'normalize.css';
import './index.sass';

class Layout extends React.Component {
  /** get the metadata object */
  getSiteMetadata = (data) => data.site.siteMetadata;

  /** get the design metadata object */
  getDesign = (data) => this.getSiteMetadata(data).design;

  /** get the title from metadata */
  getTitle = (data) => {
    const { title, subTitle } = this.getSiteMetadata(data);
    return `${title}: ${subTitle}`;
  };

  /** get the content padding from metadata/mobile state */
  getContentPadding = (data) => {
    const { design } = this.getSiteMetadata(data);

    return this.props.sizes.mobile
      ? design.mobileContentPadding
      : design.contentPadding;
  };

  render() {
    return (
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
                  mobileContentPadding
                }
              }
            }
          }
        `}
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
                  href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900"
                  rel="stylesheet"
                />
                <link
                  href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700"
                  rel="stylesheet"
                />

                <link
                  href="https://fonts.googleapis.com/css?family=Fjalla+One"
                  rel="stylesheet"
                />

                <link
                  href="https://fonts.googleapis.com/css?family=Pathway+Gothic+One"
                  rel="stylesheet"
                />
              </Helmet>
              <MainNav
                design={this.getDesign(data)}
                mainNav={data.site.siteMetadata.navLayout.mainNav}
                sizes={this.props.sizes}
              />
              <Header headerImage={this.props.headerImage} />
              <main
                style={{
                  maxWidth: `${data.site.siteMetadata.design.maxWidth}px`,
                  minHeight: '100vh',
                  padding: `0 ${this.getContentPadding(data)}px`,
                }}
                className="mainContent"
              >
                {this.props.children}
              </main>
              <FooterNav
                design={this.getDesign(data)}
                maxWidth={data.site.siteMetadata.design.maxWidth}
                footerNav={data.site.siteMetadata.navLayout.footerNav}
                sizes={this.props.sizes}
              />
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
