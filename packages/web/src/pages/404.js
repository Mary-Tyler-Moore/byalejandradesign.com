import React from 'react';
import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import NotFound from '../components/NotFound';

const NotFoundPage = ({ location }) => (
  <Layout location={location} title="404">
    <NotFound />
  </Layout>
);

export default NotFoundPage;
