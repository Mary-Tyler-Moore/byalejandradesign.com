import * as React from 'react';
// import Button from '../Button';
import './not-found.sass';

function NotFound(props) {
  return (
    <section>
      <h3 className="h3-headline">Oh No!</h3>
      <p className="copy">
        We are sorry but the page you are looking for does not exist
      </p>
    </section>
  );
}

export default NotFound;
