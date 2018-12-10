import * as React from 'react';
import Helmet from 'react-helmet';
import { OrderConfirmation } from '@byalejandradesign/templates';
import Layout from '../../components/Layout';
import { transaction } from '@byalejandradesign/checkout-objects';
// inherit styles
import '@byalejandradesign/templates/build/style.css';

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="Checkout Confirmation">
        <Helmet />
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
