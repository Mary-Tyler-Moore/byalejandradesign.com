import URLToTitle from '../url-to-title';

describe('it outputs titles from url strings', () => {
  test('it is a function', () => {
    expect(typeof URLToTitle).toBe('function');
  });

  test('it correctly formats the title', () => {
    const url = '/shop';
    const title = 'Shop';
    expect(URLToTitle(url)).toBe(title);
  });

  test('it correctly formats the title with multiple slashes', () => {
    const url = './shop///';
    const title = 'Shop';
    expect(URLToTitle(url)).toBe(title);
  });

  test('it correctly renders kebab case', () => {
    const url = '/shop-item';
    const title = 'Shop Item';
    expect(URLToTitle(url)).toBe(title);
  });

  test('it correctly renders wihout leading slash', () => {
    const url = 'shop-item';
    const title = 'Shop Item';
    expect(URLToTitle(url)).toBe(title);
  });
});
