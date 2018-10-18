import * as React from 'react';
import { OrderConfirmation } from '@artetexture/templates';
import Layout from '../../components/Layout';

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout>
        <OrderConfirmation transaction={{ ...this.props.location.state }} />
      </Layout>
    );
  }
}

export default ConfirmationPage;
