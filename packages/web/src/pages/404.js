import React from 'react';
import Head from '../components/Head';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';

const NotFoundPage = ({ location }) => (
  <React.Fragment>
    <Head location={location} title="404" />
    <Layout>
      <NotFound />
    </Layout>
  </React.Fragment>
);

export default NotFoundPage;
