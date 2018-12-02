import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Button from '../Button';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<Button />);
    expect(render.toJSON()).toMatchSnapshot();
  });

  test('it loads', () => {
    const render = TestRenderer.create(
      <Button margin fullWidth className="class" name="button" type="submit">
        click me
      </Button>
    );
    expect(render.toJSON()).toMatchSnapshot();
  });
});
