import * as React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import Braintree from './Braintree';
// actions
import { saveClient, saveError } from './braintree-actions';

import type { Dispatch } from '../../../store/types';

const mapStateToProps = (state) => ({
  loadedAt: state.checkout.braintree.loadedAt,
  status: state.checkout.braintree.status,
  client: state.checkout.braintree.client,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveError: (err) => dispatch(saveError(err)),
  saveClient: (client) => dispatch(saveClient(client)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Braintree);
