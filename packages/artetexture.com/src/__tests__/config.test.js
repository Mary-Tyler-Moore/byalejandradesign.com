import * as React from 'react';
import TestComponent from './helpers/TestComponent';

const importModule = (path) =>
  new Promise((res, rej) => {
    import(path)
      .then((module) => res(module))
      .catch((error) => rej(error));
  });

describe('configuration works correctly with babel 7', () => {
  test('it runs the test correctly with an import', () => {
    // if this runs then the config works
    return expect(importModule('react')).resolves.toHaveProperty('Component');
  });

  test('it imports a module with an import statement inside it', () => {
    return expect(
      importModule('./helpers/TestComponent')
    ).resolves.toHaveProperty('default');
  });

  test('it imports a module with nested import statements inside it', () => {
    return expect(
      importModule('./helpers/TestComponentNested')
    ).resolves.toHaveProperty('default');
  });
});
