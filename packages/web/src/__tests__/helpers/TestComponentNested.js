import * as React from 'react';
import TestComponent from './TestComponent';

const TestComponentNested = (props) => (
  <div>
    <TestComponent />
  </div>
);

export default TestComponentNested;
