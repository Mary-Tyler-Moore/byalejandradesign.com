import stringifyDimensions from '../stringify-dimensions';

describe('it works', () => {
  test('it is a function ', () => {
    expect(typeof stringifyDimensions).toBe('function');
  });

  test('it runs without crashing', () => {
    expect(stringifyDimensions()).toMatchSnapshot();
  });

  test('it returns empty string with no arguments', () => {
    expect(stringifyDimensions()).toBe('');
  });

  test('it stringifies correctly with two of three dimensions', () => {
    const string = '7" x 8"';

    expect(stringifyDimensions({ length: 7, width: 8 })).toBe(string);
    expect(stringifyDimensions({ length: 7, height: 8 })).toBe(string);
    expect(stringifyDimensions({ width: 7, height: 8 })).toBe(string);
  });
});
