# Environment

This is package builds and replaces all of the shared server env variables. The variables are held in .env.{stage} files and they are rendered as strings in the final build. You can import this package directly like so

```js
import env from '@byalejandrdesign/server-env';

const SECRET = env.SECRET;
```

Basically I am just creating an object with secret strings that is not committed to source. This seems the easiest way to interface with multiple environments and multiple architectures where really the only common variable is npm. All frameworks seem to have their own way of injecting things into the `process.env` object so I am just creating my own.
