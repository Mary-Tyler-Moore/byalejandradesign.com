import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Submit from '../../components/Checkout/Submit';
import Layout from '../../components/Layout';

export default ({ location, ...props }) => (
  <Layout location={location} title="Checkout Confirmation">
    <Helmet />
    <Submit {...props} />
  </Layout>
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
