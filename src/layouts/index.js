import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';
import { MainNav, FooterNav } from '../components/Nav';

// import Header from '../components/header'
import 'normalize.css';
import './index.sass';

const Layout = ({ children, data, sizes }) => (
  <div className="root">
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <MainNav mainNav={data.site.siteMetadata.navLayout.mainNav} sizes={sizes} />
    <header
      style={{
        width: '100%',
        height: '400px',
        background: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      Header type is Mobile {sizes.mobile.toString()}
    </header>
    {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
    <main className="mainContent">{children()}</main>
    <FooterNav
      footerNav={data.site.siteMetadata.navLayout.footerNav}
      sizes={sizes}
    />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default withSize({ mobile: true })(Layout);

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
      }
    }
  }
`;
