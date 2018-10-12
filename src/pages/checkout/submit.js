import * as React from 'react';
import { graphql } from 'gatsby';
import Submit from '../../components/Checkout/Submit';
import Layout from '../../components/Layout';

export default (props) => (
  <Layout>
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
