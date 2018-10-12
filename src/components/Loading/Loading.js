import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = (props: {}) => (
  <section className="braintree_spinner">
    <FontAwesomeIcon icon="spinner" size="2x" pulse />
  </section>
);

export default Loading;
