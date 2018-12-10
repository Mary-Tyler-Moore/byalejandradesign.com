import React from 'react';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';

const NotFoundPage = ({ location }) => (
  <Layout location={location} title="404">
    <NotFound />
  </Layout>
);

export default NotFoundPage;
