import * as React from 'react';
import { graphql } from 'gatsby';
import Submit from '../../components/Checkout/Submit';
import Layout from '../../components/Layout';
import Head from '../../components/Head';

export default ({ location, ...props }) => (
  <React.Fragment>
    <Head location={location} title="Checkout Confirmation" />
    <Layout>
      <Submit {...props} />
    </Layout>
  </React.Fragment>
);

export const query = graphql`
  query AllProductAndCollectionData {
    allWordpressWpShop {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
