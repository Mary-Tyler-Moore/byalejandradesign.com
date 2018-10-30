# Templates

This is the package for all shared front end code. Mostly I deal with react templates here and shared sass files. This is helpful for little bits and pieces where I will want the same look both on the live site and in other places (usually backend). These templates are especially handy in developing the e-mails as I can get a consistent look by sharing. Import the local package anywhere in the repo after listing it as a dependency in the package.json.

```js
import { Template } '@byalejandrdesign/templates'

const Component = (props) => <Template />
```
