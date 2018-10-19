import * as React from 'react';
import { OrderConfirmation } from '@artetexture/templates';
import Layout from '../../components/Layout';
import { transaction } from '@artetexture/checkout-objects';
// inherit styles
import '@artetexture/templates/build/style.css';

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout>
        <OrderConfirmation
          transaction={{
            ...(this.props.location.state
              ? this.props.location.state
              : transaction),
          }}
        />
      </Layout>
    );
  }
}

export default ConfirmationPage;
