import * as React from 'react';
import { OrderConfirmation } from '@byalejandradesign/templates';
import Layout from '../../components/Layout';
import Head from '../../components/Head';
import { transaction } from '@byalejandradesign/checkout-objects';
// inherit styles
import '@byalejandradesign/templates/build/style.css';

class ConfirmationPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head location={this.props.location} title="Checkout Confirmation" />
        <Layout>
          <OrderConfirmation
            transaction={{
              ...(this.props.location.state
                ? this.props.location.state
                : transaction),
            }}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default ConfirmationPage;
