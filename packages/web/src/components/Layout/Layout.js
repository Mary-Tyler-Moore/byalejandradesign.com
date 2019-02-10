import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import withSize from 'react-size-components';
import Footer from '../Footer';
import MainNav from '../MainNav';
import { DefaultHeader } from '../Header';
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
  static defaultProps = {
    header: DefaultHeader,
  };

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
    const HeaderView = this.props.header;
    return (
      <React.Fragment>
        <div className="root">
          <MainNav mainNav={this.mainNav} sizes={this.props.sizes} />
          {this.props.header && <HeaderView />}
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

export const LAYOUT = graphql`
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
