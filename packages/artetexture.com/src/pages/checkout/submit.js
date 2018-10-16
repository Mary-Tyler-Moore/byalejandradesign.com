/** @flow */
import * as React from 'react';
import { graphql } from 'gatsby';
import Submit from '../../components/Checkout/Submit';
import Layout from '../../components/Layout';
// types
import type { allWordpressWpShop } from 'data';

type Props = {
  data: { allWordpressWpShop: allWordpressWpShop },
};

export default (props: Props) => (
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
